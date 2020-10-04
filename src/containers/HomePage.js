import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import BlogCard from "components/BlogCard";
import { useSelector, useDispatch } from "react-redux";
import { blogActions } from "redux/actions";
import { useHistory, Link } from "react-router-dom";
import Pagination from "../components/PaginationBar";

const HomePage = () => {
  const history = useHistory();
  let blogList = useSelector((state) => state.blog.blogs);
  let loading = useSelector((state) => state.blog.loading);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();

  const gotoBlogDetail = (index) => {
    history.push(`/blogs/${index}`);
  };

  useEffect(() => {
    dispatch(blogActions.getBlogList());
  }, [dispatch]);

  return (
    <Container>
      <h1>Social Blog</h1>
      <p>Write about your amazing experiences.</p>
      {isAuthenticated && (
        <Link to="/blog/add">
          <Button variant="primary">Write now</Button>
        </Link>
      )}

      <Row style={{ margin: "20px 0" }}>
        <Col md={{ span: 6, offset: 3 }}>
          <h3 style={{ textAlign: "center" }}>What's new ?</h3>
        </Col>
      </Row>
      <Row
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {loading ? (
          <h4 style={{ textAlign: "center" }}>loading</h4>
        ) : (
          blogList.map((blog) => (
            <BlogCard
              blog={blog}
              key={blog._id}
              gotoBlogDetail={gotoBlogDetail}
            />
          ))
        )}
      </Row>
    </Container>
  );
};

export default HomePage;
