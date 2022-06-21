import {
  fireEvent,
  render,
  cleanup,
  screen,
  waitFor,
} from "@testing-library/react";
import Card from "../Card";

afterEach(cleanup);
test("task input", () => {
  render(<Card />);
  const textInput = screen.getByPlaceholderText(/what needs to be done/i);
  expect(textInput).toBeRequired();
});

test("clear complete tasks is not disabled", () => {
  render(<Card />);
  const clearButton = screen.getByTestId(/clear/i);
  expect(clearButton).not.toBeDisabled();
});

test("when to-do list is empty the field has a placeholder element and the field doesn't crash", () => {
  render(<Card />);
  const noTasks = screen.getByTestId(/no tasks/i);
  expect(noTasks).toBeInTheDocument();
});

test("change value of input works correctly", () => {
  render(<Card />);
  const textInput = screen.getByTestId(/input/i);
  fireEvent.change(textInput, {
    target: {
      value: "test",
    },
  });
  expect(textInput.value).toBe("test");
});
test("text from input clears on submit", () => {
  render(<Card />);
  // const buttonEl = screen.getByTestId(/input/i);
  const textInput = screen.getByTestId(/input/i);
  fireEvent.keyDown(textInput, { key: "Enter", code: "Enter", charCode: 13 });
  expect(textInput.value).toBe("");
});

test("editing items in todo list works properly", () => {
  render(<Card />);
  const todoList = screen.getByTestId(/taskList/i);
  const textInput = screen.getByTestId(/input/i);
  fireEvent.change(textInput, {
    target: {
      value: "test",
    },
  });
  fireEvent.keyDown(textInput, { key: "Enter", code: "Enter", charCode: 13 });
  expect(todoList.childElementCount).toBeGreaterThanOrEqual(1);

  //'number of items left' shows the correct number of active tasks
  const tasksLeft = screen.getByTestId(/tasksLeft/i);
  expect(tasksLeft.innerHTML).toBe("1 item left");

  //check icon appears with the new item
  const checkIcon = screen.getByTestId(/check/i);
  expect(checkIcon).toBeInTheDocument();
  //on checking an item it becomes 'complete'
  fireEvent.click(checkIcon);
  const todoItem = screen.getByTestId(/todoItem/i);
  expect(todoItem).toHaveClass("finished");

  //editing mode opens
  const editIcon = screen.getByTestId(/edit/i);
  fireEvent.click(editIcon);

  //in editing mode buttons delete and save appear
  const deleteIcon = screen.getByTestId(/delete/i);
  const saveIcon = screen.getByTestId(/save/i);
  expect(deleteIcon).toBeInTheDocument();
  expect(saveIcon).toBeInTheDocument();

  //on clicking delete the item disappears
  fireEvent.click(deleteIcon);
  expect(todoItem).not.toBeInTheDocument();
});
