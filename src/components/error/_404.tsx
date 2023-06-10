import { FC } from "react"

export const _404: FC = () =>{

    return (
      <div className="error-page">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <div className="error-404 text-center">
                <div className="image"><img src="../assets/img/404.svg" /></div>
                <h1 className="red-color title weight400">Page not found!</h1>
                <p className="px18 weight400 grey-color">Uh oh, we can’t seem to find the page you’re looking for.</p> 
                <p className="px18 weight400 grey-color">Try going to the <a className="blue-color" href="/">Home Page</a> or see our <a className="blue-color" href="/help">Help Center</a> for more information</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )

}