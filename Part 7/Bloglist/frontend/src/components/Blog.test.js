import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
import Blog from "./Blog";

test("renders content", () => {
  const user = {
    name: "Paco Zavala",
    username: "MrPaco",
    id: "54321",
  };
  const blog = {
    title: "Titulo para el test",
    author: "Paco Zavala",
    likes: 5,
    url: "loco.com",
    user: user,
  };
  const mockBlogDelete = jest.fn();
  const mockLikesHandler = jest.fn();
  const component = render(
    <Blog
      blog={blog}
      user={user}
      addLike={mockLikesHandler}
      deleteBlog={mockBlogDelete}
    />
  );
  const div = component.container.querySelector("div");
  console.log(prettyDOM(div));
  component.debug();

  expect(component.container).toHaveTextContent(
    "Titulo para el test, by Paco Zavala"
  );
});

test("so that likes and url show", () => {
  const user = {
    name: "Paco Zavala",
    username: "MrPaco",
    id: "54321",
  };

  const blog = {
    title: "Titulo para el test",
    author: "Paco Zavala",
    likes: 5,
    url: "loco.com",
    user: user,
  };
  const mockBlogDelete = jest.fn();
  const mockLikesHandler = jest.fn();
  const component = render(
    <Blog
      blog={blog}
      user={user}
      addLike={mockLikesHandler}
      deleteBlog={mockBlogDelete}
    />
  );
  const button = component.getByText("view");
  fireEvent.click(button);

  expect(component.container).toHaveTextContent("5");
  expect(component.container).toHaveTextContent("loco.com");
});

test("if like button is clicked twice", () => {
  const user = {
    name: "Paco Zavala",
    username: "MrPaco",
    id: "54321",
  };
  const blog = {
    title: "Titulo para el test",
    author: "Paco Zavala",
    likes: 5,
    url: "loco.com",
    user: user,
  };

  const mockBlogDelete = jest.fn();
  const mockLikesHandler = jest.fn();

  const component = render(
    <Blog
      blog={blog}
      user={user}
      addLike={mockLikesHandler}
      deleteBlog={mockBlogDelete}
    />
  );
  const button = component.getByText("like");
  fireEvent.click(button);
  fireEvent.click(button);

  expect(mockLikesHandler.mock.calls).toHaveLength(2);
});
