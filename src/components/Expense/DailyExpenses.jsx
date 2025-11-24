import React, { useState, useEffect } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setExpenses, addExpense, updateExpense, deleteExpense } from "@/store/slices/expensesSlice";

const FIREBASE_BASE = "https://myspend-sharpener-default-rtdb.firebaseio.com/expense";

const DailyExpenses = () => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.items);
  const premiumActive = useSelector((state) => state.expenses.premiumActive);
  const uid = useSelector((state) => state.auth.uid);

  const [money, setMoney] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Food");
  const [editId, setEditId] = useState(null);

  // Fetch expenses from Firebase
  const fetchExpenses = async () => {
    if (!uid) return dispatch(setExpenses([]));

    try {
      const res = await axios.get(`${FIREBASE_BASE}/${uid}.json`);
      const arr = res.data ? Object.keys(res.data).map(key => ({ id: key, ...res.data[key] })) : [];
      dispatch(setExpenses(arr));
    } catch (err) {
      console.error("Failed to fetch expenses:", err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [uid]);

  // Add or Update expense
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!money || !description || !uid) return;

    const expenseData = { money, description, category };

    try {
      if (editId) {
        await axios.put(`${FIREBASE_BASE}/${uid}/${editId}.json`, expenseData);
        dispatch(updateExpense({ ...expenseData, id: editId }));
        setEditId(null);
      } else {
        const res = await axios.post(`${FIREBASE_BASE}/${uid}.json`, expenseData);
        dispatch(addExpense({ ...expenseData, id: res.data.name }));
      }

      setMoney("");
      setDescription("");
      setCategory("Food");
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  // Delete expense
  const deleteHandler = async (id) => {
    if (!uid) return;

    try {
      await axios.delete(`${FIREBASE_BASE}/${uid}/${id}.json`);
      dispatch(deleteExpense(id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // Edit expense
  const editHandler = (exp) => {
    setMoney(exp.money);
    setDescription(exp.description);
    setCategory(exp.category);
    setEditId(exp.id);
  };

  if (!uid) {
    return (
      <Container fluid className="mt-5" style={{ maxWidth: "500px" }}>
        <Card className="p-4">
          <h5 className="text-center">Please login to view or add expenses.</h5>
        </Card>
      </Container>
    );
  }

  return (
    <Container fluid className="mt-5" style={{ maxWidth: "500px" }}>
      <Card className="p-4" style={{ borderRadius: "14px" }}>
        <h3 className="text-center mb-3">{editId ? "Edit Expense" : "Add Daily Expense"}</h3>

        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Money Spent</Form.Label>
            <Form.Control type="number" value={money} onChange={(e) => setMoney(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
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

          <Button type="submit" className="w-100 btn-primary">{editId ? "Update Expense" : "Add Expense"}</Button>
        </Form>
      </Card>

      {premiumActive && (
        <Button
          className="w-100 mt-3"
          style={{ backgroundColor: "var(--pink)", border: "none", color: "white", fontWeight: "600", padding: "0.8rem", borderRadius: "12px" }}
        >
          Activate Premium
        </Button>
      )}

      <h4 className="mt-4">Your Expenses</h4>

      {expenses.length === 0 ? <p>No expenses added yet.</p> : expenses.map((exp) => (
        <Card key={exp.id} className="mb-2" style={{ backgroundColor: "var(--green)", color: "white", borderRadius: "12px" }}>
          <Card.Body className="d-flex justify-content-between align-items-center">
            <div>
              <strong>{exp.category}</strong>: ₹{exp.money} <br />
              <em>{exp.description}</em>
            </div>
            <div>
              <Button size="sm" onClick={() => deleteHandler(exp.id)} className="me-2" style={{ backgroundColor: "transparent", color: "white", border: "1px solid white" }}>✖</Button>
              <Button size="sm" onClick={() => editHandler(exp)} style={{ backgroundColor: "transparent", color: "white", border: "1px solid white" }}>✎</Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default DailyExpenses;
