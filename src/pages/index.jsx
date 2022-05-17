import React, { useEffect, useState } from "react";
import "../styles/styleHome.css";
import "../styles/chargeFile.css";
import { postAPI } from "../utils/fetchData";
import Loading from "../components/Loading";
import NavBar from "../components/navigation";

const Home = () => {
  // Initialize state
  const [image, setImage] = useState({
    uri: null,
    file: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [dataForm, setDataForm] = useState({
    attendu: "",
    linkImg: "",
    data: ""
  });

  const loadImage = (e) =>
    setImage({
      uri: URL.createObjectURL(e.target.files[0]),
      file: e.target.files[0]
    });

  // Load a picture
  const handleSubmit = async (img_) => {
    setIsLoading(true);

    if (img_.file) {
      createPrediction(image.file);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  };

  const createPrediction = async () => {
    const newFile = new FormData();
    newFile.append("img", image.file);

    const res = await postAPI("predict-glasses", newFile);

    if (res) {
      //   setImage({ uri: null, file: null });
      setDataForm({ ...dataForm, data: res.data });
    }
  };
  useEffect(() => {
    //
  }, [dataForm.linkImg]);

  return (
    <>
      <NavBar />

      <div className='mainHome'>
        <div className='contentResume'>
          A partir de la photo,ce model predit si une personne porte les
          lunnetes ou pas.
        </div>
        <div className='contentChargeFile-res'>
          <div className='firstFlex'>
            <h2> Charger votre photo ici </h2>

            <div className='contentInputPicture'>
              <div className='contentInput'>
                <div>
                  <select
                    className='inputText'
                    onChange={(e) => {
                      setDataForm({ ...dataForm, attendu: e.target.value });
                    }}
                  >
                    <option value=''> Choisir</option>
                    <option value='glasses'> Lunnettes</option>
                    <option value='no_glasses'> Pas de lunnettes</option>
                  </select>
                </div>
                <div>
                  <input
                    type='file'
                    multiple={false}
                    onChange={(e) => loadImage(e)}
                  />
                </div>
                <div>
                  <button
                    type='button'
                    className='btn btn-primary'
                    onClick={() => handleSubmit(image)}
                    disabled={
                      dataForm.attendu === "" || image.uri === null
                        ? true
                        : false
                    }
                  >
                    {isLoading ? "Loading..." : "Charger"}
                  </button>
                </div>
              </div>
            </div>
            {/* fin */}

            {/* <ChargeFile /> */}
          </div>
          <div className='lastFlex photoLoaded'>
            <h2> Photo chargée </h2>
            {image.uri !== null && <img src={image.uri} alt='...' />}
          </div>
          <div className='lastFlex'>
            <h2> Resultat de la prédiction </h2>

            <section>
              {!isLoading ? (
                <>
                  <h4>
                    Resultat attendu :
                    {dataForm.prediction !== "" && dataForm.attendu}
                  </h4>
                  <h4>
                    Resultat de la prediction :
                    <span
                      style={{
                        marginLeft: "10px",
                        color: `${
                          dataForm.data?.class === dataForm.attendu
                            ? "green"
                            : "red"
                        } `
                      }}
                    >
                      {dataForm.data !== "" && dataForm.data?.class}
                    </span>
                  </h4>
                  <h4>
                    Confiance :
                    {dataForm.data !== "" &&
                      dataForm?.data?.confiance.substring(
                        1,
                        dataForm?.data?.confiance.length - 1
                      )}
                  </h4>
                </>
              ) : (
                <div
                  style={{
                    paddingTop: "30px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Loading />
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
