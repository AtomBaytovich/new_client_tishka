import { formatNumber } from "../../../utils/nubmer";
import { Card } from "../card";
import style from "./style.module.scss";

export const SectionWork = ({
    countUsers,
    countView,
    countMopiks
}) => {
    return (
        <section className={style.sectionWork}>
            <div className={style.title}>
                <p>Как это работает?</p>
            </div>
            <div className={style.batyaListCard}>
                <div className={style.mediaTI}>
                    <img src="./assets/main/blue-nemo-tishka.png" alt="немо и тишка в масочках синенькие красивенькие" />
                </div>
                <div className={``}>
                    <ul className={`${style.listMy}`}>
                        <li>Ты заходишь в аккаунт и можешь начинать писать мопики</li>
                        <li>Мопик - это твои мысли</li>
                        <li>Не сохраняем никаких данных о тебе</li>
                        <li>Для авторизации нужен только логин и пароль</li>
                    </ul>
                    <div className={style.list}>
                        <Card backgroundColor="#41495F" width={"150px"} height={"150px"}>
                            <div className={style.card}>
                                <p>{formatNumber(countMopiks)}</p>
                                <p>мопиков</p>
                            </div>
                        </Card>

                        <Card backgroundColor="#41495F" width={"150px"} height={"150px"}>
                            <div className={style.card}>
                                <p>{formatNumber(countUsers)}</p>
                                <p>юзеров</p>
                            </div>
                        </Card>

                        <Card backgroundColor="#41495F" width={"150px"} height={"150px"}>
                            <div className={style.card}>
                                <p>{formatNumber(countView)}</p>
                                <p>просмотров</p>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}