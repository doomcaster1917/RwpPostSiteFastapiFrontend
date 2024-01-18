import React from 'react';
import  "./MainPage.css"

const MainPage = () => {
    return (
        <div className={'mainPage'}>
            <div className={'ClaimContainerLeft'}>
                <div className={'ClaimText'}>В такой ситуации остаётся только бороться
                    за свои рабочие права.
                </div>
            </div>

            <div className={'imagesContainerRight'}>
                <img id={'bigPic'} src={require('../../../../../static/media/big_circle.png')}></img>

                <div className={'message'} id={'top-message'}>
                    <div className={'TextBox'} id={'topText'}>Огромные поставки в сотни килограмм. Чтобы их принять,
                        приходится
                        оставаться после работы. И это никто не оплачивает.
                    </div>
                    <img className={'SmallImage'} id={'topPic'}
                         src={require('../../../../../static/media/boxes_small_pic.png')}></img>

                </div>

                <div className={'message'} id={'middle-message'}>
                    <div className={'TextBox'} id={'middleText'}>Очереди в десятки человек, которые обычно
                        принимает 1 или 2 окна из 4, потому что не хватает сотрудников
                    </div>
                    <img className={'SmallImage'} id={'middlePic'}
                         src={require('../../../../../static/media/crowd_1.png')}></img>
                </div>


                <div className={'message'} id={'lower-message'}>
                    <div className={'TextBox'} id={'lowerText'}>Кричащие в очереди недовольные люди. Потому что
                        сотрудников не
                        хватает, а работать никто не устраивается из-за низкой зарплаты
                    </div>
                    <img className={'SmallImage'} id={'lowerPic'} src={require('../../../../../static/media/crowd_2.png')}></img>
                </div>

            </div>

        </div>
    );
};

export default MainPage;