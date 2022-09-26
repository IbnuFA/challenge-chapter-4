import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useLocation, useNavigate, useParams } from "react-router-dom";

//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, InputGroup, Form, Container, Nav, Table, NavItem } from "react-bootstrap";

export default function MainTask() {
    const [data, setData] = useState([]);
    const [refreshData, setRefreshData] = useState(true);
    const [post, setPost] = useState(null);
    const [addTask, setAddTask] = useState('');
    const [completedTask, setCompleteTask] = useState('');
    const [search, setSearch] = useState('')

    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    console.log(location)
    //get data API
    const fetchData = async() => {
        try{
            const res = await axios({
                method:'GET',
                url: `https://632b00e01090510116ce482a.mockapi.io/todo/to-do-list${location.search}`,
            })
            setData(res?.data);
        } catch(error) {
            console.log(error)
        } finally {
            setRefreshData(false);
        }
    }

    useEffect(()=>{
        if(refreshData){
            fetchData();
        }
    },[refreshData, location.search])

    //update data
    async function compeletedTask(id) {
        await axios.put(`https://632b00e01090510116ce482a.mockapi.io/todo/to-do-list/${id}`, {
            complete: true,
        }).then((respone) => {
            setCompleteTask(respone.data);
            setRefreshData(true);
        })
    }

    //delete data
    const deleteTask = async (id) => {
        try{
            await axios({
              method: 'DELETE',
              url: `https://632b00e01090510116ce482a.mockapi.io/todo/to-do-list/${id}`,
            });
            setRefreshData(true)
          } catch(error){
            console.log(error);
          } finally{
            setRefreshData(true);
          }
    }

    //filter completed task
    const completedTaskFilter = (tasks) => {
        const completedTasks = tasks.filter((task) => {
            return task.complete;
        })
        // console.log(completedTasks);
        const filteredTaskId = completedTasks.map((task) => {
            return task.id;
        });

        if(filteredTaskId){
            navigate(`?complete=true`);
        }else{
            navigate(`/`);
        }
        setRefreshData(true);
    };

    //filter todo task
    const todoTaskFilter = (tasks) => {
        const todoTasks = tasks.filter((task) => {
            return !task.complete;
        })
        // console.log(todoTasks);
        const filteredTaskId = todoTasks.map((task) => {
            return task.id;
        });

        if(filteredTaskId){
            navigate(`?complete=false`);
        }else{
            navigate(`/`);
        }
        setRefreshData(true);
    };

    const allTaskFilter = (tasks) => {
        const allTasks = tasks.map((task) => {
            return task.id
        })
        console.log(allTasks);

        if(allTasks){
            navigate(`/`);
        }
        setRefreshData(true);
    }

    //delete completed task
    const deleteCompletedTask = async (tasks) => {
        const completedTasks = tasks.filter((task) => {
            return task.complete;
        })
        console.log(completedTasks);
        const taskIds = completedTasks.map((task) => {
            return task.id;
        });

        try {
            await Promise.all(taskIds.map(async (id) => {
                await deleteTask(id);
            }))
        } catch (error) {
            console.log(error)
        } finally{
            setRefreshData(true);
        }
    }

    //delete all task
    const deleteAllTask = async (tasks) => {
        console.log(tasks)
        const taskIds = tasks.map((task) => {
            return task.id;
        });

        console.log(taskIds);

        try {
            await Promise.all(taskIds.map(async (id) => {
                await deleteTask(id);
            }))
        } catch (error) {
            console.log(error)
        }
    }

    //add task
    // const postTask = async () => {
    //     await axios.post(`http://localhost:3001/posts` , {
    //         task: addTask,
    //         complete: false,
    //     }).then((response) => {
    //         setPost(response.data);
    //         setRefreshData(true)
    //     });
    // }

    return(
        <div> 
            <Container className="mb-4">
                <InputGroup>
                    <Form.Control
                        controlId="searchTask"
                        placeholder="cari Task"
                        name="search" 
                        value={search} 
                        onChange={(a)=> {
                            a.preventDefault();
                            setSearch(a.target.value);
                        }} 
                    />
                    <Button variant="primary" type="submit" onClick={() => {
                                if(search){
                                    navigate(`?task=${search}`)
                                }else{
                                    navigate(`/`)
                                }
                                setRefreshData(true)
                            }}
                    >
                        Cari
                    </Button>

                    <Button className="ms-4" onClick={() => navigate(`/add`)}>Add Task</Button>
                    <Button className="ms-4" onClick={() => setRefreshData(true)}>Refresh</Button>
                </InputGroup>
            </Container>


            <Container>
                <h4 className="text-center">List Task</h4>
                <Nav className="justify-content-center mb-3" activeKey="/home">
                    <Nav.Item>
                        <h5>Sort By :</h5>
                    </Nav.Item>
                    <Nav.Item>
                        <Button as="a" 
                                variant="primary" 
                                className="ms-4"
                                size="sm"
                                onClick={() => allTaskFilter(data)}
                        > 
                            All Task
                        </Button>
                    </Nav.Item>
                    <Nav.Item>
                        <Button as="a" 
                                variant="primary" 
                                className="ms-4"
                                size="sm"
                                onClick={() => completedTaskFilter(data)}
                        > 
                            Done Task 
                        </Button>
                    </Nav.Item>
                    <Nav.Item>
                        <Button as="a" 
                                variant="primary" 
                                className="ms-4"
                                size="sm"
                                onClick={() => todoTaskFilter(data)}
                        > 
                            To Do Task 
                        </Button>
                    </Nav.Item>
                </Nav>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th className="justify-content-center">Task</th>
                            <th className="justify-content-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((item) => {
                            if(item.complete === true){
                                return(
                                    <tr key={item.id} className="bg-success p-2 text-dark bg-opacity-10">
                                        <td>
                                            {item.task}
                                        </td>
                                        <td>
                                            <Button as="a" variant="secondary" size="sm" className="ms-3" disabled> Completed </Button>
                                            <Button as="a" variant="primary" size="sm" className="ms-3" onClick={() => navigate(`update/${item.id}`)}> Edit </Button>
                                            <Button as="a" variant="danger" size="sm" className="ms-3" onClick={() => deleteTask(item.id)}> Delete </Button>
                                        </td>
                                    </tr>
                                )
                            }else{
                                return(
                                    <tr key={item.id}>
                                    <td>
                                        {item.task}
                                    </td>
                                    <td>
                                        <Button as="a" variant="success" size="sm" className="ms-3" onClick={() => compeletedTask(item.id)}> Complete </Button>
                                        <Button as="a" variant="primary" size="sm" className="ms-3" onClick={() => navigate(`update/${item.id}`)}> Edit </Button>
                                        <Button as="a" variant="danger" size="sm" className="ms-3" onClick={() => deleteTask(item.id)}> Delete </Button>
                                    </td>
                            </tr>
                                )
                            }
                        })}
                        </tbody>
                </Table>
            </Container>
            
            <Container className="mb-4">
                <Nav className="justify-content-end" activeKey="/home">
                    <Nav.Item>
                        <Button as="a" variant="danger" size="md" className="ms-4" onClick={() => deleteCompletedTask(data)}> Delete Done Task </Button>
                    </Nav.Item>
                    <Nav.Item>
                        <Button as="a" variant="danger" size="md" className="ms-4" onClick={() => deleteAllTask(data)}> Delete All Task </Button>
                    </Nav.Item>
                </Nav>
            </Container>
            
            
            
        </div>
    )
}