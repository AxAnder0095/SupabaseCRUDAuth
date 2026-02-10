import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export function useTodo(userId) {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTodos = async () => {
    if (!userId) return;

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

    setTodos((prev) =>
      prev.map((t) => (t.id === todo.id ? data : t))
    );
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

  return {
    todos,
    title,
    setTitle,
    fetchTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
  };
}
