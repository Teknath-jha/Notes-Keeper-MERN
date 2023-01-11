import React, { useEffect } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../actions/notesAction";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

const MyNotes = ({ search }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const noteList = useSelector((state) => state.noteList);

  const { loading, notes, error } = noteList;

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  const deleteHandler = (id) => {
    if (window.confirm(`Are you sure ? : ${id}`)) {
      dispatch(deleteNoteAction(id));
    }
  };

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      navigate("/");
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successCreate,
    successUpdate,
    successDelete,
  ]);

  return (
    <>
      {userInfo ? (
        <MainScreen title={`Welcome back  ${userInfo.name}...`}>
          <Link to="/createnote">
            <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
              Create New Note
            </Button>
          </Link>
          {loadingDelete && <Loading />}

          {errorDelete && (
            <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
          )}
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {loading && <Loading />}
          {notes
            ?.reverse()
            .filter((filteredNote) =>
              filteredNote.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((note) => (
              <Accordion defaultActiveKey={["0"]} key={note._id}>
                <Accordion.Item eventkey="0">
                  <Card style={{ margin: 10 }}>
                    <Card.Header style={{ display: "flex" }}>
                      <span
                        style={{
                          color: "black",
                          textDecoration: "none",
                          flex: 1,
                          cursor: "pointer",
                          alignSelf: "center",
                          fontSize: 18,
                        }}
                      >
                        <Accordion.Button as={Card.Text} variant="link">
                          {note.title}
                        </Accordion.Button>
                      </span>
                      <div>
                        <Button href={`/note/${note._id}`}>
                          <EditIcon />
                        </Button>
                        <Button
                          variant="danger"
                          className="mx-2"
                          onClick={() => deleteHandler(note._id)}
                        >
                          <DeleteIcon />
                        </Button>
                      </div>
                    </Card.Header>
                    <Accordion.Collapse>
                      <Card.Body>
                        <h4>
                          <Badge pill bg="success" text="light">
                            Category - {note.category}{" "}
                          </Badge>
                        </h4>

                        <blockquote className="blockquote mb-0">
                          <p>{note.content}</p>
                          <footer className="blockquote-footer">
                            Created on{" "}
                            <cite title="Source Title">
                              {note.createdAt.substring(0, 10)}
                            </cite>
                          </footer>
                        </blockquote>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion.Item>
              </Accordion>
            ))}
        </MainScreen>
      ) : (
        <MainScreen title={`Welcome back ...`}></MainScreen>
      )}
    </>
  );
};

export default MyNotes;
