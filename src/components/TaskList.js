import React from 'react'
import axios from 'axios'
import '../styles/TaskList.css'
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import { API_URL } from '../config/environment';


class TaskList extends React.Component {
    state = {
        task: '',
        taskList: []
    }

    componentDidMount() {
        this.getTaskList();
    }

    componentDidUpdate() {
        this.getTaskList()
    }

    getTaskList = () => {
        axios.get(API_URL + '/tasks')
            .then(res => {
                this.setState({ taskList: res.data })
                console.log(res.data);
            })
        .catch(err => {
            console.error(err);
        }
    )}

    onDeleteClick = async (taskid) => {
        axios.delete(API_URL + `/deleteTasks/${taskid}`)
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.componentDidUpdate();
    }

    onSubmitClick = async () => {
        axios.post(API_URL + '/addTasks', {
            task: this.state.task
        })
        this.setState({ task: '' })
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.componentDidMount();
    }

    render() {
        return (
            <div className='taskList'>
                <h2 style={{paddingTop: '10px'}}>タスク管理</h2>
                    <div className='ui input' style={{paddingBottom: '10px'}}>
                        <input value={this.state.task} type='text' onChange={(e) => this.setState({task: e.target.value})} placeholder='Todoを追加'/>
                </div>
                    {this.state.task === '' || this.state.task.length > 30 ? '' : 
                        <Button className='ui primary button basic' onClick={() => this.onSubmitClick()}>追加</Button>
                    }
                    <hr />
                    <div className="ui cards" style={{padding: '10px 10px 0 10px', display:'flex', justifyContent: 'space-between'}}>
                    {
                        this.state.taskList.map((task,taskid) => (
                            <div className="card" key={taskid}>
                                <div className="content">
                                    <div className="meta" style={{fontWeight: 'bold', fontSize:'20px', paddingBottom: '5px'}}>
                                        {task.task}
                                    </div>
                                    <div className="extra content">
                                        <div className="ui buttons">
                                            <Button className="ui basic red button" onClick={() => this.onDeleteClick(task.taskid)}>
                                                <DeleteIcon/>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        )
    }
}

export default TaskList