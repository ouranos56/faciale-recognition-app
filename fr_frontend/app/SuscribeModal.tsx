"use client"

import "./globals.css";
import { useRef } from "react";

export default function SuscribeModal() {

    const modalRef = useRef<HTMLDialogElement>(null);

    return (
        <div>
            <button className="btn btn-outline text-[#00933c] hover:text-[#00d769] border-[#316074] hover:bg-[#316074]" onClick={
                () => modalRef.current?.showModal()
            }
            > Souscrire
            </button >

            <dialog id="my_modal_2"
                className="modal"
                ref={modalRef}
            >
                <div className="modal-box">
                    <form method="get" action="" className="justify-center items-center w-100 pl-15">
                        <div className="mt-5">
                            <label className="floating-label">
                                {/* <legend className="fieldset-legend mb">What is your email address ?</legend> */}
                                <span>Your Email</span>
                                <input type="email" className="input validator input-md" required placeholder="mail@site.com" />
                                <div className="validator-hint">Enter valid email address</div>
                            </label>
                        </div>

                        <div className="mt-2">
                            <input type="checkbox" defaultChecked className="checkbox checkbox-success" />
                            <span>
                                <label >I consent to being contacted by the team</label>
                            </span>
                        </div>
                        <button type="submit" className="btn btn-outline btn-success btn-[#009a5f] border-[#11c67f] hover:bg-[#11c67f] mt-5">Submit</button>
                    </form>
                </div>

                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

        </div>
    )
}