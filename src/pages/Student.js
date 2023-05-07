import React, { useState, useEffect } from "react";
import studentService from "../services/majorService";

const Student = (props) => {
    useEffect(()=>{
        loadApi();
    },[])
   const loadApi = () =>{
    studentService.list().then((res)=>{
        console.log(res)
    })
   }
  return (
    <>
      <div className="container mt-4">
              <div className="card border-primary bt-5">
                <div className="card-header">
                  <div className="row">
                    <div className="col">
                      <h3 className="card-title">
                        Student <small className="text-muted">list</small>
                      </h3>
                    </div>
                    <div className="col-auto">
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#editModal"
                      >
                        <i className="bi-plus-lg"></i> Add
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-bordered border-primary table-hover table-striped">
                      <thead>
                        <tr className="table-primary border-primary">
                          <th style={{ width: "50px" }}>#</th>
                          <th>Studen Id</th>
                          <th>Full name</th>
                          <th>Gender</th>
                          <th>Phone</th>
                          <th>Email</th>
                          <th style={{ width: "80px" }}></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>01-01-1990</td>
                          <td>Trương Thái Trung</td>
                          <td>
                          <i class="fa-solid fa-person fa-xl" style={{color: '#ff1a3c'}}></i>
                          </td>
                          <td>0123456789</td>
                          <td>abcx@gmail.com</td>
                          <td>
                            <a href="google.com">
                              <i className="bi-pencil-square text-primary"></i>
                            </a>
                            <a href="google.com">
                              <i className="bi-trash text-danger"></i>
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>01-01-1991</td>
                          <td>Nguyễn Văn B</td>
                          <td>
                          <i class="fa-solid fa-person fa-xl" style={{color: '#ff1a3c'}}></i>
                          </td>
                          <td>0123456789</td>
                          <td>abcx@gmail.com</td>

                          <td>
                            <a href="google.com">
                              <i className="bi-pencil-square text-primary"></i>
                            </a>
                            <a href="google.com">
                              <i className="bi-trash text-danger"></i>
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>01-01-1992</td>
                          <td>Nguyễn Thị Hà</td>
                          <td>
                          <i class="fa-solid fa-person-dress fa-xl" style={{color: '#ff00dd'}}></i>
                          </td>

                          <td>0123456789</td>
                          <td>abcx@gmail.com</td>

                          <td>
                            <a href="google.com">
                              <i className="bi-pencil-square text-primary"></i>
                            </a>
                            <a href="google.com">
                              <i className="bi-trash text-danger"></i>
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td>01-01-1993</td>
                          <td>Nguyễn Thị Hồng</td>
                          <td>
                          <i class="fa-solid fa-person-dress fa-xl" style={{color: '#ff00dd'}}></i>
                          </td>
                          <td>0123456789</td>
                          <td>abcx@gmail.com</td>

                          <td>
                            <a href="google.com">
                              <i className="bi-pencil-square text-primary"></i>
                            </a>
                            <a href="google.com">
                              <i className="bi-trash text-danger"></i>
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
    </>
  );
};

export default Student;
