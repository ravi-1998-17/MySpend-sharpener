import React, { useState, useEffect } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";

const DailyExpenses = () => {
  const [money, setMoney] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Food");

  // Load initial state from localStorage
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("dailyExpenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  // Save expenses to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("dailyExpenses", JSON.stringify(expenses));
  }, [expenses]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!money || !description) return;

    const newExpense = {
      id: Date.now(),
      money,
      description,
      category,
    };

    setExpenses([newExpense, ...expenses]);

    // Reset form
    setMoney("");
    setDescription("");
    setCategory("Food");
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "500px" }}>
      <Card style={{ padding: "20px" }}>
        <h3 className="text-center mb-3">Add Daily Expense</h3>
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
            <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="Food">Food</option>
              <option value="Petrol">Petrol</option>
              <option value="Salary">Salary</option>
              <option value="Shopping">Shopping</option>
              <option value="Other">Other</option>
            </Form.Select>
          </Form.Group>

          <Button type="submit" className="w-100">
            Add Expense
          </Button>
        </Form>
      </Card>

      <h4 className="mt-4">Your Expenses</h4>
      {expenses.length === 0 ? (
        <p>No expenses added yet.</p>
      ) : (
        expenses.map((exp) => (
          <Card key={exp.id} className="mb-2">
            <Card.Body>
              <strong>{exp.category}</strong>: ₹{exp.money} <br />
              <em>{exp.description}</em>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};

export default DailyExpenses;
