<?php
        include_once 'crm.php';

        class ApiCrm{

                function getAll(){
                        $lead = new Crm();
                        $leads = array();
                        $leads["datos"] = array();
                        $res = $lead->obtenerDatos();

                        if($res->rowCount()){
                                while($row = $res->fetch(PDO::FETCH_ASSOC)){
                                        $dato = array(
                                                'customerId' => $row['customer'],
                                                'cliente' => $row['cliente'],
                                                'monto' => $row ['monto'],
                                                'transacciones' => $row ['transacciones'],
                                                'ticket_medio' => $row ['ticket_medio'],
                                                'pais' => $row ['pais']
                                        );
                                        array_push($leads['datos'], $dato);
                                }

                                //echo json_encode($leads);
                                return $leads;

                        }else{
                                echo json_encode(array('mensaje' => 'No hay elementos registrados'));
                        }
                }
        }
?>
