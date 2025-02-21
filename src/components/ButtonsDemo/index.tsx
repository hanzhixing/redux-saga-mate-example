import SuccessDemoButton from './SuccessDemoButton';
import FailureDemoButton from './FailureDemoButton';
import SharedStateDemoButton1 from './SharedStateDemoButton1';
import SharedStateDemoButton2 from './SharedStateDemoButton2';
import SharedStateDemoButton3 from './SharedStateDemoButton3';

const ButtonsDemo = () => (
    <article className="flex flex-col gap-10">
        <section className="flex gap-5">
            <SuccessDemoButton />
            <FailureDemoButton />
        </section>
        <hr />
        <section>
            <p className="leading-loose">
                <b>[1]</b>
                and
                <b>[2]</b>
                below dispatches two same actions
                (both types and payloads are the same)
                created using,
                <code>redux-hyper-action</code>
                so they will share the same loading state.
            </p>
            <code className="leading-loose">
                {'dispatch(createAsyncAction(ActionType.ASYNC_NOOP, {to: \'succeed\', foo: \'bar\'}))'}
            </code>
            <br />
            <p className="leading-loose">
                But
                <b>[3]</b>
                will not share the same loading state,
                even if its type and payload are the same too.
            </p>
            <p className="leading-loose">
                Because we create the action with unique option:
                <b>Action Type + Action Payload + Action Time = Action Instance.</b>
            </p>
            <code className="leading-loose">
                {'dispatch(createAsyncUniqueAction(ActionType.ASYNC_NOOP, {to: \'succeed\', foo: \'bar\'}))'}
            </code>
        </section>
        <section className="flex gap-5">
            <SharedStateDemoButton1 />
            <SharedStateDemoButton2 />
            <SharedStateDemoButton3 />
        </section>
    </article>
);

export default ButtonsDemo;
