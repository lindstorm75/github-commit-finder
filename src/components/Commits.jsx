import React from "react"
import Commit from "./Commit"
import Animation from "./Animation"
import loadingAnimation from "../animations/loading.json"

const Commits = ({ loading, commits, username, repo }) => {

  if (loading && commits === null) return <Animation animationData={loadingAnimation} width={200} height={200} />
  
  if (commits === null) return null

  const commitCards = commits.map((commit, index) => {
    const commitUrl = commit.commit.url.split("/")
    const message = commit.commit.message.split("\n")[0]
    const commitSha = commitUrl[commitUrl.length - 1]
    const rawDateTime = commit.commit.committer.date.split("T")
    const rawDate = rawDateTime[0]
    const rawTime = rawDateTime[1].split("Z")[0].split(":")
    const hr = +rawTime[0] + 7
    const mn = +rawTime[1]
    const sec = +rawTime[2]
    const dateTime = `${rawDate} ${hr}:${mn}:${sec}`
    console.log(message)
    return <Commit username={username} repo={repo} commitSha={commitSha} dateTime={dateTime} message={message} latest={index === 0} />
  })
  
  return (
    <div className="text-center mt-5">
      <h2>User: <span class="badge bg-primary">{username}</span> Repository: <span class="badge" style={{ backgroundColor: "#EF4444" }}>{repo}</span>
      </h2>
      <div className="d-flex flex-wrap justify-content-center">
        {commitCards}
      </div>
    </div>
  )
}

export default Commits