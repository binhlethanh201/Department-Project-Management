import { useState, useEffect } from "react";
import { Container, Row, Col, Table, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

function Project() {
  const [project, setProject] = useState([]);
  const [department, setDepartment] = useState([]);
  const [deFiltered, setdeFiltered] = useState("all");

  useEffect(() => {
    fetch("http://localhost:9999/projects")
      .then((response) => response.json())
      .then((result) => setProject(result))
      .catch((error) => console.error(error));

    fetch("http://localhost:9999/departments")
      .then((response) => response.json())
      .then((result) => setDepartment(result))
      .catch((error) => console.error(error));
  }, []);

  const filteredProjects =
    deFiltered === "all"
      ? project
      : project.filter((p) => p.department == deFiltered);

  return (
    <Container>
      <Row style={{ marginBottom: "20px" }}>
        <h1 style={{ textAlign: "center", fontWeight: "bold" }}>
          List of Projects
        </h1>
      </Row>
      <Row>
        <Col md={3}>
          <h5 style={{ fontWeight: "bold" }}>Departments</h5>
          <Form>
            <Form.Check
              type="radio"
              label="All"
              value="all"
              checked={deFiltered === "all"}
              onChange={(e) => setdeFiltered(e.target.value)}
            />
            {department?.map((d) => (
              <Form.Check
                key={d?.id}
                type="radio"
                label={d?.name}
                value={d?.id}
                checked={deFiltered == d?.id}
                onChange={(e) => setdeFiltered(e.target.value)}
              />
            ))}
          </Form>
        </Col>
        <Col md={9}>
          <Table className="table table-hover table-striped table-bordered">
            <thead>
              <tr>
                <th>Id</th>
                <th>Project name</th>
                <th>Description</th>
                <th>Start date</th>
                <th>Type</th>
                <th>Department</th>
                <th>Function</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((p) => (
                <tr key={p?.id}>
                  <td>{p?.id}</td>
                  <td>{p?.name}</td>
                  <td>{p?.description}</td>
                  <td>{p?.startDate}</td>
                  <td>{p?.type}</td>
                  <td>
                    <Link to={"/departments/" + p.id + "/employees"}>
                      {department.find((d) => d.id == p?.department)?.name}
                    </Link>
                  </td>
                  <td>
                    <Link to={"/project/edit/" + p.id}>Edit</Link>
                  </td>
                </tr>
              ))}
              {filteredProjects.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center">
                    No projects found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default Project;
