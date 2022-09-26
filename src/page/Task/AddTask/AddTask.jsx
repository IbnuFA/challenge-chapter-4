import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, InputGroup, Form, Container, } from "react-bootstrap";

export default function AddTask() {
    const [data, setData] = useState([]);
    const [addTask, setAddTask] = useState('')
    const [post, setPost] = useState(null)
    const params = useParams();
    const navigate = useNavigate();
    
    //get data API
    const fetchData = async() => {
        try{
            const res = await axios({
                method:'GET',
                url: `https://632b00e01090510116ce482a.mockapi.io/todo/to-do-list`,
            })
            setData(res?.data);
        } catch(error) {
            console.log(error)
        }
    }    

    //add task
    const postTask = async () => {
        await axios.post(`https://632b00e01090510116ce482a.mockapi.io/todo/to-do-list` , {
            task: addTask,
            complete: false,
        }).then((response) => {
            setPost(response.data);
            navigate(`/`)
        });
    }

    useEffect(() => {
        fetchData();
    }, [])

    return(
        <div>
            <Container className="d-flex justify-content-center mb-3">
                <InputGroup>
                <Form.Control
                            controlId="addtask"
                            placeholder="Tambah Task"
                            name="addTask" 
                            value={addTask} 
                            onChange={(e)=> setAddTask(e.target.value)}
                        />
                        <Button variant="outline-secondary" onClick={postTask}>
                            Tambah Task
                        </Button>
                </InputGroup>
            </Container>

            <Container className="d-flex justify-content-center mb-3">
                <Button variant="danger"
                        onClick={(e)=> {
                            e.preventDefault();
                            navigate(`/`)
                        }}
                >
                    Batal
                </Button>
            </Container>

        </div>
    )
}