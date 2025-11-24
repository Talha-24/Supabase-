import { useEffect, useState } from 'react'
import { supabaseClient } from '../../libraries/supabase';

function TaskManager() {

    const [task, setTask] = useState<{ title: string, description: string }>({ title: "", description: "" });
    const [allTasks, setAllTasks] = useState<{ title: string, description: string, created_at: string, id: string }[]>([]);
    const [isEditTask, setIsEditTask] = useState<boolean>(false);
    const [singleTaskId, setSingleTaskId] = useState<string>("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTask((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isEditTask) {
            const { error } = await supabaseClient.from("tasks")
                .insert([task]);
            if (!error) {
                alert("created");
                setAllTasks((prev:any) => [...prev, task]);
            }
        } else {
            const { error } = await supabaseClient.from("tasks").update(task).eq("id", singleTaskId);
            if (!error) {
                setSingleTaskId('');
                setIsEditTask(false);
                alert("updated");
                fetchTasks();
                setTask({ title: "", description: "", })
            }
        }
    }


    const fetchTasks = async () => {

        const { data, error } = await supabaseClient.from("tasks").select("*");
        if (data) {
            setAllTasks(data);
        }

    }


    useEffect(() => {
        fetchTasks();
    }, [])



    const deleteTaskHandler = async (id: string) => {
        const { data, error } = await supabaseClient.from("tasks").delete().eq("id", id).select("*").maybeSingle();
        if (data) {
            const updateTasks = allTasks.filter((task) => {
                return task.id !== data.id;
            })
            setAllTasks(updateTasks);
            alert('deleted')
        }
    }


    return (
        <div>
            <div className='w-fit flex items-center justify-center flex-col bg-gray-800'>
                {/* CREATE TASK */}
                <form onSubmit={handleSubmit} className='overflow-y-scroll  min-w-xl p-10 bg-gray-800' >
                    <div>
                        <div className='flex flex-col items-start'>
                            <label htmlFor="">Title</label>
                            <input type="text" name='title' className='border-1  w-full p-2' onChange={handleChange} value={task.title} />
                        </div>
                        <div className='flex flex-col items-start'>
                            <label htmlFor="">Description</label>
                            <textarea name="description" id="" onChange={handleChange} value={task.description} className='border-1 border p-2 w-full mb-2'></textarea>
                        </div>
                        <button className='border bg-emerald-600 text-white w-full text-sm py-1 px-2 rounded-sm'>{isEditTask ? "Edit Task" : "Add Task"}</button>
                    </div>
                    <div className='flex flex-col items-start'>
                        <h1 className='my-2'>All Tasks</h1>

                        {allTasks.map((task) => {
                            return (
                                <div className='flex gap-20'>
                                    <div className='flex flex-col text-left'>
                                        <h1 className='font-semibold text-blue-600 text-lg'>{task.title}</h1>
                                        <p className='text-white'>{task.description}</p>
                                    </div>
                                    <div className='flex gap-2 items-center '>
                                        <button onClick={() => {
                                            setSingleTaskId(task.id);
                                            setTask({ title: task.title, description: task.description });
                                            setIsEditTask(true);
                                        }} disabled={isEditTask} className='bg-red-500 font-medium px-4 rounded-sm py-1 cursor-pointer'>Edit</button>
                                        <button type='button' disabled={isEditTask} onClick={() => { deleteTaskHandler(task.id) }} className='bg-green-500 font-medium px-4 rounded-sm py-1 cursor-pointer'>Delete</button>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                </form>
                {/* ALL TASKS */}




            </div>
        </div>
    )
}

export default TaskManager
