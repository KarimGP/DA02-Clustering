<?php
        include_once 'db.php';

        class Crm extends DB{
        

                function obtenerDatos(){
                        $query = $this->connect()->query("SELECT 
                        transa_retail.customer_id as customer, 
                        clientes_retail.name as cliente, 
                        SUM(transa_retail.price) as monto, 
                        COUNT(DISTINCT transa_retail.invoice) as transacciones, 
                        SUM(transa_retail.price)/ COUNT(DISTINCT transa_retail.invoice) as ticket_medio, 
                        clientes_retail.country as pais
                        from `transa_retail` 
                        JOIN clientes_retail on transa_retail.customer_id = clientes_retail.customer_id GROUP BY transa_retail.customer_id");
                        return $query;
                }
        }
?>
