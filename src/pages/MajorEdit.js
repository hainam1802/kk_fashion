import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import Input from "../components/Input";
import majorService from "../services/majorService";
// import CustomButton from "./../components/CustomButton";
const MajorEdit = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [major, setMajor] = useState({ id: 0, name: "" });

  useEffect(() => {
    if (!/\d+/.test(id)) {
      navigate("/not-found");
    } else {
      if (id > 0) {
        majorService.get(id).then((res) => setMajor(res.data));
      }
    }
  }, [id, navigate]);

  const handleBack = () => {
    navigate("/major");
  };

  const handleChange = (e) => {
    const newData = { ...major };
    newData[e.target.name] = e.target.value;
    setMajor(newData);
  };

  const handleSave = () => {
    if (major.id === 0) { //neu major.id === 0 thi them moi
      majorService.add(major).then((res) => {
        if (res.errorCode === 0) {
          navigate("/major");
        } else {
          setMessage(res.message);
        }
      });
    } else { // nguoc lai thi update
      majorService.update(major.id, major).then((res) => {
        if (res.errorCode === 0) {
          navigate("/major");
        } else {
          setMessage(res.message);
        }
      });
    }
  };


  return (
    <>
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card border-primary bt-5">
              <div className="card-header">
                <h3 className="card-title">
                  Major{" "}
                  <small className="text-muted">
                    {Number(id) === 0 ? "new" : "edit"}
                  </small>
                </h3>
              </div>
              <div className="card-body">
                <p className="text-center text-danger">{message}</p>
                <form>
                  <Input
                    id="txtMajor"
                    label="Major name"
                    type="text"
                    name="name"
                    onChange={handleChange}
                    defaultValue={major.name} 
                  />
                </form>
              </div>
              <div className="card-footer text-center">
                <button
                  type="button"
                  onClick={handleBack}
                  className="btn btn-secondary me-1 "
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  className="btn btn-primary"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MajorEdit;
