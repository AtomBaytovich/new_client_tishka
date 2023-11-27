import { Card } from "../card";
import style from "./style.module.scss";

export const SectionWork = () => {
    return (
        <section className={style.work}>
            <div className={style.title}>
                <p>Как это работает?</p>
            </div>
            <div className={style.mediaTI}>
                <img src="./assets/main/blue-nemo-tishka.png" alt="немо и тишка в масочках синенькие красивенькие" />
            </div>
            <ul className={style.listMy}>
                <li>Ты заходишь в аккаунт и можешь начинать писать мопики</li>
                <li>Мопик - это твои мысли</li>
                <li>Не сохраняем никаких данных о тебе</li>
                <li>Для авториации нужен только логин и пароль</li>
            </ul>
            <div className={style.list}>
                <Card backgroundColor="#41495F">
                    <div className={style.card}>
                        <p>150</p>
                        <p>мопиков</p>
                    </div>
                </Card>

                <Card backgroundColor="#41495F">
                    <div className={style.card}>
                        <p>17</p>
                        <p>юзеров</p>
                    </div>
                </Card>

                <Card backgroundColor="#41495F">
                    <div className={style.card}>
                        <p>365</p>
                        <p>просмотров</p>
                    </div>
                </Card>
            </div>
        </section>
    )
}