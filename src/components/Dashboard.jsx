import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { supabase } from "../supabaseClient";
import "../styles/Dashboard.scss";

export const Dashboard = () => {
    const { session, signOut } = UserAuth();
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState("");
    const userId = session?.user?.id;

    const handleSignOut = async (e) => {
        e.preventDefault();
        try {
            await signOut();
            navigate('/')
        } catch (err) {
            console.error("Error signing out:", err.message);
        }
    };

    const fetchTodos = async () => {
        if (!userId) return; // Ensure we have a user ID before fetching todos
        const { data, error } = await supabase
            .from("todos")
            .select("*")
            .eq("user_id", userId)
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching todos:", error.message);
            return;
        }

        setTodos(data || []);
    };

    const addTodo = async (e) => {
        e.preventDefault();
        const trimmedTitle = title.trim();
        if (!trimmedTitle || !userId) return;

        const { data, error } = await supabase
            .from("todos")
            .insert([{ title: trimmedTitle, user_id: userId }])
            .select()
            .single();

        if (error) {
            console.error("Error adding todo:", error.message);
            return;
        }

        setTodos((prev) => [data, ...prev]);
        setTitle("");
    };

    const toggleTodo = async (todo) => {
        const { data, error } = await supabase
            .from("todos")
            .update({ is_complete: !todo.is_complete })
            .eq("id", todo.id)
            .eq("user_id", userId)
            .select()
            .single();

        if (error) {
            console.error("Error updating todo:", error.message);
            return;
        }

        setTodos((prev) => prev.map((t) => (t.id === todo.id ? data : t)));
    };

    const deleteTodo = async (todoId) => {
        const { error } = await supabase
            .from("todos")
            .delete()
            .eq("id", todoId)
            .eq("user_id", userId);

        if (error) {
            console.error("Error deleting todo:", error.message);
            return;
        }

        setTodos((prev) => prev.filter((t) => t.id !== todoId));
    };

    useEffect(() => {
        fetchTodos();
    }, [userId]);

    return (
        <div className="dashboard">
            <div className="inner-dashboard">
                <h1>Dashboard</h1>
                <p>Welcome, {session?.user?.email}</p>
                <button onClick={handleSignOut} className="signout-button">Sign Out</button>

                <div className="todo-panel">
                    <h2>My Todos</h2>
                    <form onSubmit={addTodo} className="todo-form">
                        <input
                            type="text"
                            placeholder="New todo..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <button type="submit">Add</button>
                    </form>

                    <ul className="todo-list">
                        {todos.length === 0 ? (
                            <li className="todo-empty">No todos yet.</li>
                        ) : (
                            todos.map((todo) => (
                                <li
                                    key={todo.id}
                                    className={todo.is_complete ? "todo-item done" : "todo-item"}
                                >
                                    <button
                                        type="button"
                                        className="todo-toggle"
                                        onClick={() => toggleTodo(todo)}
                                        aria-pressed={todo.is_complete}
                                    >
                                        {todo.is_complete ? "Undo" : "Done"}
                                    </button>
                                    <span className="todo-title">{todo.title}</span>
                                    <button
                                        type="button"
                                        className="todo-delete"
                                        onClick={() => deleteTodo(todo.id)}
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
};