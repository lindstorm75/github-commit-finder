import React, { useRef, useState } from "react"
import Form from "./Form"
import Commits from "./Commits"
import Wrapper from "./Wrapper"

const App = () => {

  const [commits, setCommits] = useState(null)
  const [username, setUsername] = useState(null)
  const [repo, setRepo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [repoLink, setRepoLink] = useState("<repo's link>")
  const [currentSha, setCurrentSha] = useState("<commit sha>")
  const [scroll, setScroll] = useState(true)
  const commitCardsRef = useRef(null)
  const commandRef = useRef(null)

  const fetchLatestCommit = async (username, repo, date, time) => {
    setCommits(null)
    setNotFound(false)
    setLoading(true)
    setUsername(username)
    setRepo(repo)
    const res = await fetch(`https://api.github.com/repos/${username}/${repo}/commits?until=${date}T${time}:00Z`, { 
      method: 'GET', 
      headers: new Headers({
        'Authorization': `token ${process.env.REACT_APP_TOKEN}`, 
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    })
    const data = await res.json()
    if (data.message === "Not Found") {
      setNotFound(true)
      setLoading(false)
      setCommits([])
      setTimeout(() => setNotFound(false), 3000)
      return
    }
    setCommits(data)
    setLoading(false)
    setRepoLink(`https://github.com/${username}/${repo}`)
  }

  if (commitCardsRef.current !== null && scroll) {
    commitCardsRef.current.scrollIntoView()
    setScroll(false)
  }

  return (
    <>
      <div className="w-100 col-xs-12 col-md-6 col-lg-4 col-xl-3 d-flex flex-column align-items-center justify-content-center pt-4">
        <h1 className="mt-2 mt-md-4">Github Commit Finder</h1>
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center col-12 col-md-11 col-lg-10 col-xl-6">
          <Form fetchLatestCommit={fetchLatestCommit} notFound={notFound} />
          <div className="d-flex flex-column justify-content-center py-2 px-4 col-12 col-sm-10 col-md-8 col-lg-6">
            <blockquote className="blockquote mb-2">
              <p>A commit card contains the followings</p>
            </blockquote>
            <div className="card mt-1 mb-2 mb-md-4 w-100" >
              <h5 className="card-header position-relative pt-4 px-2 text-center">
                <div style={{ top: -10, left: 10 }} className="position-absolute" >
                  <span style={{ backgroundColor: "#6B7280" }} className="badge">date time</span>
                  <span style={{ backgroundColor: "#10B981" }} className="badge ms-2">Lastest?</span>
                </div>
                commit sha <i className="far fa-copy copy" ></i>
              </h5>
              <div className="card-body text-start">
                <p className="card-text">commit message</p>
                <button
                  className="btn"
                  style={{ backgroundColor: "#3B82F6", color: "white" }}
                >
                  Commit page
                </button>
              </div>
            </div>
            <blockquote className="blockquote mb-2">
              <p ref={commandRef}>Get a specific commit via</p>
            </blockquote>
            <pre>
              git clone <span className={repoLink === "<repo's link>" ? "" : "highlight"}>{repoLink}</span>
              <br />
              git checkout <span className={currentSha === "<commit sha>" ? "" : "highlight"}>{currentSha}</span>
            </pre>
          </div>
        </div>
      </div>
      <Commits
        refProp={commitCardsRef}
        notFound={notFound}
        loading={loading}
        commits={commits}
        username={username}
        repo={repo}
        setCurrentSha={setCurrentSha}
        commandRef={commandRef}
      />
      {loading && <Wrapper />}
    </>
  )
}

export default App