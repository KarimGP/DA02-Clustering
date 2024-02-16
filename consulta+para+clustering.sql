--consulta para clustering

SELECT transa_retail.customer_id as customer, 
SUM(transa_retail.price) as ventas, 
COUNT(DISTINCT transa_retail.invoice) as transacciones, 
SUM(transa_retail.price)/ COUNT(DISTINCT transa_retail.invoice) as ticket_medio 
from `transa_retail` JOIN clientes_retail on transa_retail.customer_id = clientes_retail.customer_id 
WHERE transa_retail.price>0
GROUP BY transa_retail.customer_id ORDER BY `transacciones` DESC")
