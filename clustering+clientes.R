rm(list = ls())
options(scipen=999)

## Carga de librerias
library(DBI)
library(RMySQL)
library(RJDBC)

library(factoextra)
library(ggplot2)

library(dplyr)

#llamar al archivo de conexion

source("/Users/pedroalcala/Documents/Curso Data Science MySQL/consultas/conexion.R")

# desarrollo del clustering

dbGetQuery(conn,"set names utf8")

cluster <-dbGetQuery(conn, statement = "SELECT transa_retail.customer_id as customer, sum(transa_retail.price) as ventas, 
                     COUNT(DISTINCT transa_retail.invoice) as transacciones, sum(transa_retail.price)/ COUNT(DISTINCT transa_retail.invoice) as ticket_medio 
                     FROM transa_retail JOIN clientes_retail on transa_retail.customer_id = clientes_retail.customer_id WHERE transa_retail.price>0 
                     GROUP BY transa_retail.customer_id ORDER BY `transacciones` DESC")

# Escalar los datos para estandarizar

data_cluster <- data.frame(cluster[,-1], row.names=cluster[,1])
data_escalada <- scale(data_cluster)
#head(data_escalada)

# Exlorar la cantidad optima de clusteres

fviz_nbclust(data_escalada, kmeans, method="wss")+
  labs(subtitle = "wss method")

fviz_nbclust(data_escalada, kmeans, method = "silhouette")+
  labs(subtitle = "Silhouette method")


# Aplicacion de Kmedia para clusterizar
set.seed(123)
kmediasclientes<-kmeans(data_escalada,2, nstart = 25)
#print(kmediasclientes)


aggregate(data_cluster, by=list(cluster=kmediasclientes$cluster), mean)

dd <- cbind(data_cluster, cluster = kmediasclientes$cluster)

#exploracion de resultados
#head(dd)

#kmediasclientes$centers
#kmediasclientes$size
#kmediasclientes$cluster

fviz_cluster(kmediasclientes, data = data_escalada,
             palette = c("#2E9FDF", "#FC4E07"),
             ellipse.type = "euclid", # Elipses de concentracion
             star.plot = TRUE, # Coloca lineas desde los centrides a los items
             repel = TRUE, # Evita la sobre impresion de etiquetas
             ggtheme = theme_minimal()
)

######### Creacion de la tabla a guardar en la base de datos

df <- tibble::rownames_to_column(dd, "customer")
df <- df[,c(1,5)]

dbWriteTable(conn, name='cluster_retail', value=df, row.names=FALSE, append=TRUE, field.types = c(customer="varchar(10)", cluster="numeric"))

dbDisconnect(conn)


