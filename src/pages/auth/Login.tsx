import { FC } from "react";
import '../../assets/scss/auth.scss';
import { useAuth } from "../../utility/authProvider";
import Validator from "../../utility/validator";
import { Helmet } from "react-helmet";

export const LoginPage: FC = () => {
    const {login} = useAuth();

    const loginAction = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        const form = new Validator('login');
        if(!form.checkDirty()) form.validate();
        if(form.valid()){
          let data: any = form.data();
          login(data.email, data.password);
        }
    }

  return (
    <div className="auth">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{"Parivartan"}</title>
        <link rel="icon" type="image/ico" href="/favicon.png"/> 
        <link rel="shortcut icon" type="image/ico" href="/favicon.png" /> 
        <link rel="apple-touch-icon" sizes="57x57" href="/favicon.png" /> 
        <link rel="apple-touch-icon" sizes="72x72" href="/favicon.png" /> 
        <link rel="apple-touch-icon" sizes="114x114" href="/favicon.png" /> 
        <link rel="apple-touch-icon" sizes="144x144" href="/favicon.png" /> 
        <meta name="description" content={"Parivartan"} />
        <meta name="viewport" content="width=1024, initial-scale=1.0"></meta>
      </Helmet>
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
              <div className="box">
                <div className="overlay white-bg"></div>
                <div className="brand relative">
                  <a href="/"></a>
                </div>
                <p>&nbsp;</p>
                <form
                  className="form"
                  name="login"
                  method="POST"
                  onSubmit={loginAction}
                >
                  <div className="form-row">
                    <label className="uppercase px10">Email address</label>
                    <input
                      type="text"
                      className="input-control hallow"
                      placeholder="you@parivartan.today"
                      name="email"
                      data-validate="required,email"
                    />
                  </div>
                  <div className="form-row">
                    <label className="uppercase px10">Password</label>
                    <input
                      type="password"
                      className="input-control hallow"
                      placeholder="password"
                      name="password"
                      data-validate="required"
                    />
                    <a href="/password/reset" className="help right">
                      <i className="icon-help"></i> Forgot Password?
                    </a>
                  </div>
                  <div className="form-row">
                    <button className="btn btn-blue" type="submit">
                      <i className="icon-lock"></i> Secure login
                    </button>
                    <button className="btn btn-blank" type="reset">
                      <i className="icon-times"></i> Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
