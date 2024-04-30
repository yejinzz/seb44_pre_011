import style from "./SidePanel.module.css";

const SidePanel = () => {
  return (
    <aside className={style.sidePanel}>
      {paneldata.map((panel) => (
        <div>
          <h2>{panel.title}</h2>
          <ul>
            {panel.lists.map((list) => (
              <li>{list}</li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
};

export default SidePanel;

const paneldata = [
  {
    title: "The Overflow Blog",
    lists: [
      "ideal fit for developing blockchains",
      "Environments on-demand (Ep. 479)",
      "Add related resources or links",
      "Always respect the author’s intent",
      "Don’t use edits to reply to the author",
    ],
  },

  {
    title: "Featured on Meta",
    lists: [
      "Student Ambassador Program",
      "Google Analytics 4 (GA4) upgrade",
      "Question Lifecycle",
      "The [option] tag is being burninated",
      "WSO2 launches, and Google Go sunsets",
    ],
  },
];
