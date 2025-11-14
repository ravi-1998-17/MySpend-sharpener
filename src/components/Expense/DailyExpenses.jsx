import React, { useState, useEffect } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const FIREBASE_URL = "https://myspend-sharpener-default-rtdb.firebaseio.com/expense";

const DailyExpenses = () => {
    const [description, setDescription] = useState("");
    const [money, setMoney] = useState("");
    const [category, setCategory] = useState("Food");
    const [editId, setEditId] = useState(null);
    const [expenses, setExpenses] = useState([]);

    // Fetch all expenses from Firebase
    const fetchExpenses = async () => {
        try {
            const res = await axios.get(`${FIREBASE_URL}.json`);
            if (res.data) {
                const loadedExpenses = Object.entries(res.data).map(([key, value]) => ({
                    id: key,
                    ...value,
                }));
                setExpenses(loadedExpenses);
            } else {
                setExpenses([]);
            }
        } catch (err) {
            console.error("Error fetching expenses:", err);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!money || !description) return;

        const expenseData = { money, description, category };

        try {
            if (editId) {
                // Update existing expense
                await axios.put(`${FIREBASE_URL}/${editId}.json`, expenseData);
                console.log("Expense successfully updated"); // <-- Added
                setEditId(null);
            } else {
                // Add new expense
                await axios.post(`${FIREBASE_URL}.json`, expenseData);
                console.log("Expense successfully added"); // <-- Optional
            }
            fetchExpenses(); // refresh the list
            setMoney("");
            setDescription("");
            setCategory("Food");
        } catch (err) {
            console.error("Error saving expense:", err);
        }
    };

    const deleteHandler = async (id) => {
        try {
            await axios.delete(`${FIREBASE_URL}/${id}.json`);
            console.log("Expense successfully deleted"); // <-- Added
            fetchExpenses();
        } catch (err) {
            console.error("Error deleting expense:", err);
        }
    };

    const editHandler = (exp) => {
        setMoney(exp.money);
        setDescription(exp.description);
        setCategory(exp.category);
        setEditId(exp.id);
    };

    return (
        <Container className="mt-5" style={{ maxWidth: "500px" }}>
            <Card style={{ padding: "20px" }}>
                <h3 className="text-center mb-3">
                    {editId ? "Edit Expense" : "Add Daily Expense"}
                </h3>
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3">
                        <Form.Label>Money Spent</Form.Label>
                        <Form.Control
                            type="number"
                            value={money}
                            onChange={(e) => setMoney(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="Food">Food</option>
                            <option value="Petrol">Petrol</option>
                            <option value="Salary">Salary</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Other">Other</option>
                        </Form.Select>
                    </Form.Group>

                    <Button type="submit" className="w-100">
                        {editId ? "Update Expense" : "Add Expense"}
                    </Button>
                </Form>
            </Card>

            <h4 className="mt-4">Your Expenses</h4>
            {expenses.length === 0 ? (
                <p>No expenses added yet.</p>
            ) : (
                expenses.map((exp) => (
                    <Card
                        key={exp.id}
                        className="mb-2"
                        style={{ backgroundColor: "var(--green)", color: "white" }}
                    >
                        <Card.Body className="d-flex justify-content-between align-items-center">
                            <div>
                                <strong>{exp.category}</strong>: ₹{exp.money} <br />
                                <em>{exp.description}</em>
                            </div>
                            <div>
                                <Button
                                    size="sm"
                                    onClick={() => deleteHandler(exp.id)}
                                    className="me-2"
                                    style={{
                                        backgroundColor: "transparent",
                                        color: "white",
                                        border: "1px solid white",
                                    }}
                                >
                                    ✖
                                </Button>
                                <Button
                                    size="sm"
                                    onClick={() => editHandler(exp)}
                                    style={{
                                        backgroundColor: "transparent",
                                        color: "white",
                                        border: "1px solid white",
                                    }}
                                >
                                    ✎
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                ))
            )}
        </Container>
    );
};

export default DailyExpenses;
