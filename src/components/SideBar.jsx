export default function SideBar(props) {
  const { onDisplayModal, data } = props
  return (
    <div className="sidebar" onClick={onDisplayModal}>
      <div className="bgOverlay"></div>
      <div className="sidebarContents">
        <h2>{data?.title}</h2>
        <div className="descriptionContainer">
          <p className="descriptionTitle">{data?.date}</p>
          <p>{data?.explanation}</p>
        </div>
        <button onClick={onDisplayModal}>
          <i className="fa-solid fa-angles-right"></i>
        </button>
      </div>
      
    </div>
  )
}