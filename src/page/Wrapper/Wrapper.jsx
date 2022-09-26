import React from "react";
import { Outlet } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from "react-bootstrap";

export default function Wrapper() {
    return(
        <>
                <Card className="margin-zero">
                    <Card.Header className="text-center mb-4 bg-primary text-white">
                        <h3>Simple CRUD : To-Do-List</h3>
                    </Card.Header>
                    
                    <Outlet/>

                    <Card.Footer className="text-center bg-dark text-white">
                        Create by Ibnu Fauzan Affifudin
                    </Card.Footer>
                </Card>
        </>
    )
}