import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import st from './HelpUsMail.module.css'
import { getReviews } from '../../../redux/actions'


export default function HelpUsMail() {

    const messages = useSelector((state: any) => state.reviews)
    const dispatch: any = useDispatch()

    useEffect(() => {
        dispatch(getReviews());
    }, [dispatch, getReviews]);

    console.log(messages)

    return (

        <div className={st.Container}>
            <h1 className={st.title}> Feedback Mail  </h1>

            <div className={st.listContainer}>
                <ul className={st.listMessages}>
                    {messages && messages.map((msg, index) => {
                        return (
                            <div className={st.divItem}>
                                <div className={st.listHead}>
                                    <li className={st.listItem}>
                                        ID: {index + 1}
                                    </li>
                                    <li className={st.listItem}>
                                        Name: {msg.name}
                                    </li>
                                    <li className={st.listItem}>
                                        Email: {msg.email}
                                    </li>
                                </div>
                                <div className={st.itemMsg}>
                                    <li className={st.listItem}>
                                        Message: {msg.message}
                                    </li>
                                </div>
                            </div>
                        )
                    }).reverse()}
                </ul>
            </div>
        </div>
    )
}
