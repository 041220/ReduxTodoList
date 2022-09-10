import { Row, Tag, Checkbox } from 'antd';




const priorityColorMapping = {
    high: 'red',
    medium: 'blue',
    low: 'gray',
};

export default function Todo({ name, piority, completed, id }) {

    // const dispatch = useDispatch();
    // const piorityFilter = useSelector((state) => state.filters.piority)
    // console.log("check piorityFilter: ", piorityFilter);

    const toggleCheckbox = async () => {

        // await dispatch(update({ id, data: { content: name, piority, status: !completed } }))
        // await dispatch(fetchTodos({ piorityFilter }));

    };

    return (
        <Row
            justify='space-between'
            style={{
                marginBottom: 3,
                ...(completed ? { opacity: 0.5, textDecoration: 'line-through' } : {}),
            }}
        >
            <Checkbox checked={completed} onChange={toggleCheckbox}>
                {name}
            </Checkbox>
            <Tag color={priorityColorMapping[piority]} style={{ margin: 0 }}>
                {piority}
            </Tag>
        </Row>
    );
}