import React from "react"

const Commit = ({ username, repo, commitSha, dateTime, message, latest }) => {
  const handleCopy = () => {
    const container = document.createElement("input")
    container.value = commitSha
    container.select()
    container.setSelectionRange(0, 99999)
    document.execCommand("copy")
  }
  return (
    <div className="card m-md-4 m-2" style={{ width: "30rem" }} >
      <h5 className="card-header position-relative pt-4 px-2 text-center">
        <div style={{ top: -10, left: 10 }} className="position-absolute" >
          <span style={{ backgroundColor: "#6B7280" }} className="badge">{dateTime}</span>
          {latest && <span style={{ backgroundColor: "#10B981" }} className="badge ms-2">Latest</span>}
        </div>
        {commitSha} <i className="far fa-copy copy" onClick={handleCopy} ></i>
      </h5>
      <div className="card-body text-start">
        <p className="card-text">{message}</p>
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://github.com/${username}/${repo}/commit/${commitSha}`}
          className="btn"
          style={{ backgroundColor: "#3B82F6", color: "white" }}
        >
          Commit page
        </a>
      </div>
    </div>
  )
}

export default Commit