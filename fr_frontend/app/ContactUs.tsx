"use client"

import "./globals.css";
import { useEffect, useRef, useState } from "react";
import SendMail from "./SendMail";
import toast from "react-hot-toast";
import { title } from "process";

type contactUsProps = {
    setSend: React.Dispatch<React.SetStateAction<{ success?: string, error?: string }>>;
};

export default function SuscribeModal({ setSend }: contactUsProps) {

    const modalRef = useRef<HTMLDialogElement>(null);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [consented, setConsented] = useState(true);
    const [title_out, setTitle_out] = useState(false);
    const i_titleRef = useRef<HTMLDivElement>(null);

    const handSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const loadingToast = toast.loading("Envoi du mail...");

        const currentFormData = {
            firstname: firstname,
            name: lastname ? lastname : "-nom-",
            email: email,
            message: message ? message : "-message-",
            consented: consented,
        };

        console.log("formData avant envoi:", currentFormData);

        await SendMail({ formData: currentFormData, setSend: setSend });

        toast.dismiss(loadingToast);

        // Réinitialiser les champs
        setFirstname("");
        setLastname("");
        setEmail("");
        setMessage("");
        setConsented(true);

        modalRef.current?.close();
    };

    // Gérer les changements des champs

    const scaleUp = () => {
        i_titleRef.current?.classList.add("scale_up_title");
        setTimeout(() => {
            i_titleRef.current?.classList.remove("scale_up_title");
        }, 1000);
    }

    useEffect(() => {
        if (title_out) {
            i_titleRef.current?.classList.add("tooltip");
            setTimeout(() => {
                i_titleRef.current?.classList.remove("tooltip");
                setTitle_out(false);
            }, 2500);
        }
    }, [title_out]);

    return (
        <div>
            <a className="link link-hover a" onClick={
                () => modalRef.current?.showModal()
            }
            > Contact
            </a >

            <dialog id="my_modal_2 justify-center items-center"
                className="modal"
                ref={modalRef}
            >
                <div className="modal-box justify-center items-center">

                    <form
                        method="get"
                        action=""
                        className="justify-center items-center w-[100%] pl15"
                        onSubmit={(e) => handSubmit(e)}
                    >
                        <div className="">
                            <label className="floating-label">
                                <span>Your First Name</span>
                                <input
                                    type="text"
                                    className="input validator input-md w-[100%]"
                                    required
                                    placeholder="First name"
                                    pattern="[A-Za-z][A-Za-z0-9\-]*"
                                    minLength={3}
                                    maxLength={30}
                                    title="Only letters, numbers or dash"
                                    value={
                                        firstname
                                        // formData.firstname
                                    }
                                    onChange={(e) => setFirstname(e.target.value)
                                        // handleChange(e)
                                    }
                                />
                                <p className="validator-hint">Must be 3 to 30 characters containing only letters, numbers or dash</p>

                            </label>
                        </div>

                        <div>
                            <label className="floating-label">
                                <span>Your Name</span>
                                <input
                                    type="text"
                                    placeholder="marc"
                                    className="input input-md w-[100%]"
                                    value={lastname
                                        // formData.name
                                    }
                                    onChange={(e) => setLastname(e.target.value)
                                        // handleChange(e)
                                    }
                                />
                            </label>
                        </div>


                        <div className="mt-5">
                            <label className="floating-label">
                                {/* <legend className="fieldset-legend mb">What is your email address ?</legend> */}
                                <span>Your Email</span>
                                <input
                                    type="email"
                                    className="input validator input-md w-[100%]"
                                    required
                                    placeholder="mail@site.com"
                                    value={email
                                        // formData.email
                                    }
                                    onChange={(e) => setEmail(e.target.value)
                                        // handleChange(e)
                                    }
                                />
                                <div className="validator-hint">Enter valid email address</div>
                            </label>
                        </div>


                        <div className="justify-center items-center w-[100%]">
                            <fieldset className="fieldset">
                                <textarea
                                    className="textarea h-24 w-[100%]"
                                    placeholder="Message"
                                    value={message
                                        // formData.message
                                    }
                                    onChange={(e) => setMessage(e.target.value)
                                        // handleChange(e)
                                    }
                                ></textarea>
                            </fieldset>
                        </div>


                        <div className="justify-center items-center mt-2">
                            <input
                                type="checkbox"
                                defaultChecked
                                required
                                className="checkbox checkbox-success"
                            // onChange={(e) => handleChange(e)}
                            />
                            <span>
                                <label >I consent to being contacted by the team</label>
                            </span>
                        </div>

                        <div className="flex flex-row  items-center">
                            <button type="submit" className="btn btn-outline relative left-[40%] btn-success border-[#11c67f] hover:bg-[#11c67f] mt-5">Submit</button>

                            <div
                                ref={i_titleRef}
                                onClick={() => { setTitle_out(true); scaleUp() }}
                                title="ESC pour fermer la pop up!"                                
                                className="badge badge-outline i_title border-[#dd8800b3] text-[#dd8800b3] w-7 h-7 rounded-3xl cursor-help relative bottom-[-25px] m-4"
                            >i</div>
                        </div>
                    </form>


                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>


            </dialog>

        </div>
    )
}