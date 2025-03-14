import {useState, useEffect } from "react";
import { Container, Row, Table } from "react-bootstrap";
import { Link, useParams} from "react-router-dom";

function Employee() {
  const [employee, setEmployee] = useState([]);
  const [department, setDepartment] = useState([]);
  const {id} = useParams();

  useEffect(() => {
    fetch("http://localhost:9999/employees")
      .then((response) => response.json())
      .then((result) => setEmployee(result))
      .catch((error) => console.error(error));

    fetch(`http://localhost:9999/departments/${id}`)
      .then((response) => response.json())
      .then((result) => setDepartment(result))
      .catch((error) => console.error(error));
  }, []);
  
  return (
    <Container>
      <Row>
        <h1 style={{ textAlign: "center" }}>List of Employees</h1>
      </Row>
      <Row>
        <Link to={"/"}> Home page</Link>
       <h4>Department: {department?.name} </h4> 
      </Row>
      <Row>
        <Table className="table table-hover table-striped table-bordered">
          <thead>
            <tr>
              <th>Id</th>
              <th>Employee name</th>
              <th>Date of birth</th>
              <th>Gender</th>
              <th>Position</th>
            </tr>
          </thead>
          <tbody>
            {employee?.map((e) => (
              <tr key={e?.id}>
                <td>{e?.id}</td>
                <td>{e?.name}</td>
                <td>{e?.dob}</td>
                <td>{e?.gender}</td>
                <td>{e?.position}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}
export default Employee;
