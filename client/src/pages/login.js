import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, { error }] = useMutation(LOGIN_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await login({
        variables: {
          username,
          password,
        },
      });
      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
    }
  };

  // return (
//     <div id="login">
//       <div className="container">
//         <div
//           id="login-row"
//           className="row justify-content-center align-items-center"
//         >
//           <div id="login-column" className="col-md-6">
//             <div id="login-box" className="col-md-12">
//               <form id="login-form" onSubmit={handleSubmit}>
//                 <h1 className="text-center text-success pt-5">Login</h1>
//                 <div className="form-group">
//                   <input
//                     className="form-control"
//                     name="username"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     placeholder="Username"
//                     type="text"
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <input
//                     className="form-control"
//                     name="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="Password"
//                     type="password"
//                     required
//                   />
//                 </div>

//                 <div className="form-group pt-3">
//                   <button className="btn btn-info btn-md">Login</button>
//                   {error && <div>Invalid credentials</div>}
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
    return (
        <div id='login'>
            <div className='container'>
                <div id='login-row' className='row justify-content-center align-items-center'>
                    <div id='login-column' className='col-md-6'>
                        <div id='login-box' className='col-md-12'>
                            <form id='login-form' onSubmit={handleSubmit}>
                            <h2 className="text-center text-info pt-5">Please login to start an order.</h2>
                            <div className='form-group'>
                                <input
                                className='form-control'
                                    name='username'
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    placeholder='Username'
                                    type='text'
                                    required
                                />
                                </div>

                                <div className='form-group'>

                                <input
                                className='form-control'
                                    name='password'
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder='Password'
                                    type='password'
                                    required
                                />
                                </div>

                                <div className='form-group pt-3'>

                                <button className='btn btn-info btn-md'>Login</button>
                                {error && <div>Invalid credentials</div>}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;
