import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import axios from "axios";
import { LoaderSmall } from "@/components/common/StatsComps";
import VerifyEmail from "@/components/authentication/VerifyEmail";
import { useSelector, useDispatch } from "react-redux";
import { login } from "@/store/slices/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { token, email } = useSelector((state) => state.auth);

  const nameRef = useRef();
  const photoRef = useRef();

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [profileData, setProfileData] = useState({
    displayName: "",
    photoUrl: "",
  });

  // Fetch profile details
  useEffect(() => {
    if (!token) return;

    const fetchProfile = async () => {
      try {
        const res = await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBfGfNN_C1BgPf5HAFIPLRsrFXTpkYZccE`,
          { idToken: token }
        );

        const userData = res.data.users[0];
        setProfileData({
          displayName: userData.displayName || "",
          photoUrl: userData.photoUrl || "",
        });

      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [token]);

  // Submit updated profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    const displayName = nameRef.current.value;
    const photoUrl = photoRef.current.value;

    try {
      await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBfGfNN_C1BgPf5HAFIPLRsrFXTpkYZccE`,
        {
          idToken: token,
          displayName,
          photoUrl,
          returnSecureToken: true,
        }
      );

      setProfileData({ displayName, photoUrl });
      dispatch(login({ token, email }));

      setMsg("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      setMsg("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ marginTop: "10rem" }}
    >
      <Card
        className="p-4"
        style={{
          width: "100%",
          maxWidth: "450px",
          border: "none",
          borderRadius: "14px",
        }}
      >
        <Card.Body>
          <h3 className="text-center mb-4">Edit Profile</h3>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                ref={nameRef}
                defaultValue={profileData.displayName}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Profile Photo URL</Form.Label>
              <Form.Control
                type="url"
                placeholder="Enter photo URL"
                ref={photoRef}
                defaultValue={profileData.photoUrl}
                required
              />
            </Form.Group>

            <Button type="submit" className="w-100 btn-primary">
              {loading ? <LoaderSmall text={"Updating..."} /> : "Update Profile"}
            </Button>
          </Form>

          <VerifyEmail />

          {msg && (
            <p
              className="text-center mt-3"
              style={{ color: "var(--pink)", fontWeight: 600 }}
            >
              {msg}
            </p>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;
