import s from "./index.module.sass";
import home from "./home.svg";
import Board from "react-trello";
import { useContext, useState } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { UserContext } from "../../App";
import cx from "classnames";
import useFetch from "use-http";
import produce from "immer";
import { clearScreenDown } from "readline";
import { createAdd } from "typescript";

const DATA = {
  lanes: [
    {
      id: "todo",
      title: "To do",
      cards: [
        {
          id: "one",
          title: "Write Blog",
          description: "Can AI make memes",
          editable: false,
          userId: "62becf06b0bfd8d1b5abbf34",
        },
        {
          id: "two",
          title: "Write Blog",
          description: "Can AI make memes",
          editable: false,
          userId: "62becf06b0bfd8d1b5abbf34",
        },
      ],
    },
    {
      id: "progress",
      title: "In Progress",
      cards: [
        {
          id: "three",
          title: "Write Blog",
          description: "Can AI make memes",
          userId: "62becf06b0bfd8d1b5abbf34",
          editable: false,
        },
        {
          id: "four",
          title: "Write Blog",
          description: "Can AI make memes",
          userId: "62becf06b0bfd8d1b5abbf34",
          editable: false,
        },
      ],
    },
    {
      id: "completed",
      title: "Completed",
      cards: [
        {
          id: "five",
          title: "Write Blog",
          description: "Can AI make memes",
          userId: "62becf06b0bfd8d1b5abbf34",
        },
        {
          id: "six",
          title: "Write Blog",
          description: "Can AI make memes",
          userId: "62becf06b0bfd8d1b5abbf34",
        },
      ],
    },
  ],
};

const Todo: React.FC = () => {
  const user = useContext(UserContext);
  console.log("user", user);
  return (
    <div className={s.todo}>
      <Sidebar />
      <Main />
    </div>
  );
};

const Main: React.FC = () => {
  return (
    <div className={s.main}>
      <Header />
      <Content />
    </div>
  );
};

const Content: React.FC = () => {
  const [data, setData] = useState<any>(DATA);
  const [isOpen, setIsOpen] = useState(false);
  const { post } = useFetch("/data");
  const [user] = useContext(UserContext);

  const updateData = async (data: any) => {
    console.log(data);
    const newData = produce(data, (draft: any) => {
      draft.lanes.forEach((lane: any) => {
        lane.cards.forEach((c: any) => {
          // c.editable = false;
        });
      });
    });
    console.log("NEW DATA", newData);
    setData(newData);
    // await post(newData);
  };

  return (
    <div className={s.content}>
      <h1>Content</h1>
      <Board
        data={data}
        cardraggable
        editable
        components={{ AddCardLink: CustomAddCardLink }}
        onDataChange={(newData: any) => {
          updateData(data);
        }}
        onCardClick={(...args: any) => {
          console.log(args);
          setIsOpen(true);
        }}
      />

      <Drawer direction="right" open={isOpen} onClose={() => setIsOpen(false)}>
        <div>Hello World</div>
      </Drawer>
    </div>
  );
};

const Header: React.FC = () => {
  return (
    <div>
      <h1>Header</h1>
    </div>
  );
};

const CustomAddCardLink: React.FC<any> = (props) => {
  return (
    <div className={cx(props.className, s.addBtn)} {...props}>
      +
    </div>
  );
};

const Sidebar: React.FC = () => {
  return (
    <div className={s.sidebar}>
      <div className={s.logo}>.taskez</div>
      <ul>
        <li>
          <img src={home} alt="" />
          Overview
        </li>
        <li>
          <img src={home} alt="" />
          Stats
        </li>
        <li>
          <img src={home} alt="" />
          Projects
        </li>
        <li>
          <img src={home} alt="" />
          Chat
        </li>

        <li>
          <img src={home} alt="" />
          Calendar
        </li>
      </ul>
      <div className={s.btm}>
        <ul>
          <li>
            <img src={home} alt="" />
            Setting
          </li>
          <li>
            <img src={home} alt="" />
            Log Out
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Todo;
