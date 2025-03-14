import { useState, useEffect } from "react";
import { Container, Row, Form, Button } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";

function Edit() {
  const [project, setProject] = useState({});
  const [department, setDepartment] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:9999/projects/${id}`)
      .then((response) => response.json())
      .then((result) => setProject(result))
      .catch((error) => console.error(error));

    fetch("http://localhost:9999/departments")
      .then((response) => response.json())
      .then((result) => setDepartment(result))
      .catch((error) => console.error(error));
  }, [id]);

  function handleUpdate(e) {
    e.preventDefault();
    if (!project.name || project.name.trim() === "") {
      alert("Please enter the form fields that are required");
      return;
    }

    fetch(`http://localhost:9999/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        id: id,
        name: project.name,
        description: project.description,
        startDate: project.startDate,
        type: project.type,
        department: project.department,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(() => {
        alert("Update success");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error updating project:", error);
        alert("Update failed. Please try again.");
      });
  }

  return (
    <Container>
      <Row>
        <h1 style={{ textAlign: "center" }}>Edit Project</h1>
      </Row>
      <Row>
        <Link to={"/"}> Home page</Link>
      </Row>
      <Row>
        <Form onSubmit={handleUpdate}>
          <Form.Group controlId="formProjectName">
            <Form.Label>Project name *</Form.Label>
            <Form.Control
              type="text"
              value={project?.name || ""}
              onChange={(e) => setProject({ ...project, name: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              value={project?.description || ""}
              onChange={(e) =>
                setProject({ ...project, description: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group controlId="formStartDate">
            <Form.Label>Start date</Form.Label>
            <Form.Control
              type="date"
              value={project?.startDate || ""}
              onChange={(e) =>
                setProject({ ...project, startDate: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group controlId="formType">
            <Form.Label>Type</Form.Label>
            <Form.Control
              type="text"
              value={project?.type || ""}
              onChange={(e) => setProject({ ...project, type: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="formDepartment">
            <Form.Label>Department</Form.Label>
            <Form.Select
              value={project?.department || ""}
              onChange={(e) =>
                setProject({ ...project, department: e.target.value })
              }
            >
              {/* <option value="">Select Department</option> */}
              {department.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </Row>
    </Container>
  );
}

export default Edit;
