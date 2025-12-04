import { useState, useRef, useEffect } from 'react';
import CardImage from './CardImage';


type PredictCardProps = {
  fr: {
    id: string;
    prediction: string;
    img1: string | File;
    img2: string | File;
  };
  index: number;
  predValue?: boolean;
  handleSendCorrection: (id: string, rightprediction: number) => Promise<void>;
  // smoothBehavior?: string;
}


export default function PredictCard({ fr, index, predValue, handleSendCorrection /*, smoothBehavior*/}: PredictCardProps) {
  const [selectedValue, setSelectedValue] = useState(1);
  const correctionDivRef1 = useRef<HTMLDivElement>(null);
  const throughTextDivRef = useRef<HTMLDivElement>(null);
  const [rightprediction, setRightprediction] = useState<number>(1);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleCorrection = () => {
    if (correctionDivRef1.current) {
      setRightprediction(Number(selectedValue));
      correctionDivRef1.current.innerHTML = selectedValue === 0 ? "❌" : "✅";
    }
  };

  function throughText() {
    if (throughTextDivRef.current) {
      throughTextDivRef.current.style.textDecoration = "line-through";
      throughTextDivRef.current.style.textDecorationColor = "red-600";
    }
  }

  return (
    <div key={fr.id} id={fr.id} className={`card bg-base-100 shadow-xl/20 mb-12 scroll-auto md:scroll-auto `} >

      <figure>
        {
          <div className='flex flex-row justify-center items-center cardImagecontainer my-0.5'>
            
            <CardImage
              src={fr.img1 instanceof File
                ? URL.createObjectURL(fr.img1)
                : fr.img1
              }
              alt="Peaple picture"
              sizeClass="h-[35vh] w-[20vw] cardImagesize"
            />
            <CardImage
              src={fr.img2 instanceof File
                ? URL.createObjectURL(fr.img2)
                : fr.img2
              }
              alt="Peaple picture"
              sizeClass="h-[35vh] w-[20vw] cardImagesize"
            />
          </div>

        }
      </figure>

      <table className="table mb-1.5 border-base-content/12 bg-base-200 w-[100%]">
        <thead className="bg-accent/6 font-bold text-base">
          <tr>
            <th className="rounded-tl-lg p-1"></th>
            <th className='text-center p-2'>Prédiction</th>
            <th className="rounded-tr-lg text-wrap pl-1 pr-0">Taux de ressemblance</th>
          </tr>
        </thead>

        <tbody className="text-base font-mono">
          <tr>
            <th className='p-1' >{index}</th>
            <td className='p-2 border-r-1 border-amber-700'>
              <div className="flex flex-row justify-center text-center gap-2 text-amber-700 dark:text-amber-600">
                <div ref={throughTextDivRef}>
                  {!fr.prediction 
                      ? 'En attente...'
                      : fr.prediction.length >= 10
                        // ? fr.prediction
                        ? `Visage non détecté dans ${fr.prediction.split(' ')[9] +" " + fr.prediction.split(' ')[10]}`
                        : (fr.prediction.split('_').map(Number)[0] === 0
                            ? 'Visages différents'
                            : 'Visages identiques'
                          )
                  }
                </div>
                <div ref={correctionDivRef1} className='text-green-400 font-medium text-base'></div>
              </div>
            </td>
            <td className="justify-center items-center pl-[13%] pr-0">
              {fr.prediction && fr.prediction.split('_').map(Number)[1]
                ? `${(fr.prediction.split('_').map(Number)[1] * 100).toFixed(2)} %`
                // : "Indisponible."
                : "--"
              }
            </td>
          </tr>
        </tbody>
      </table>

      <div className="card-body justify-center">
        <div className="collapse collapse-arrow bg-base-100 border border-base-300 hover:border-2">
          <input type="Checkbox" name="my-accordion"
            className='peer'
            onChange={(e) => setIsOpen(e.target.checked)}
            checked={isOpen}
          />

          <div className="collapse-title font-semibold cursor-pointer text-center">
            Fausse prédiction?
          </div>

          <div className="collapse-content text-sm peer-checked:bg-base-200 py-2">

            <div className="card-actions justify-around gap-10">
              <div className="flex flex-row justify-around gap-8">
                <input
                  id={`${fr.id}-1`}
                  type="radio"
                  name={`radio-${fr.id}`}
                  className="radio radio-success bg-green-200 border-green-300 checked:bg-green-200 checked:text-green-600 checked:border-green-600 hover:border-green-600"
                  value={1}
                  title='Ces visages sont identiques '
                  disabled={predValue ? true : false}
                  onChange={(e) => {
                    setSelectedValue(Number(e.target.value));
                    setDisabled(false);
                  }}
                />
                <input
                  id={`${fr.id}-2`}
                  type="radio"
                  name={`radio-${fr.id}`}
                  className="radio radio-error bg-red-100 border-red-300 checked:bg-red-200 checked:text-red-600 checked:border-red-600 hover:border-red-600"
                  value={0}
                  title='Ces visages sont différents'
                  disabled={!predValue ? true : false}
                  onChange={(e) => {
                    setSelectedValue(Number(e.target.value));
                    setDisabled(false);
                  }}
                />
              </div>
              <button
                className="btn btn-outline border-2 border-[#316074] hover:bg-[#316074] hover:text-[#00d769] text-[#009d45] text-base font-bold"
                onClick={() => {
                  handleCorrection();
                  throughText();
                  handleSendCorrection(fr.id, rightprediction);
                  setDisabled(true);
                }}
                disabled={disabled ?? true}
              >
                Corriger la réponse!
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
