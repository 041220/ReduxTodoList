import { Col, Row, Input, Typography, Select, Tag } from 'antd';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';

import filtersSlice from './filtersSlice';

const { Search } = Input;

export default function Filters() {

    const filters = useSelector(state => state.filters)
    // const stateTodo = useSelector((state) => state)

    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(fetchTodos({ piority: stateTodo.filters.piority }));
    // }, [dispatch, stateTodo.filters.piority])


    // localStorage.setItem("filters", JSON.stringify(stateTodo.filters))

    // const filter = localStorage.getItem("filters")

    // if (filter) {
    //     dispatch(filtersSlice.actions.getDataLocal(JSON.parse(filter)))
    // }

    console.log("check filterPiority : ", filters.piority);
    const handleSearchTextChange = e => {
        const searchText = e.target.value;
        dispatch(filtersSlice.actions.searchFilterChange(searchText))

    }
    const handlePriorityChange = (value) => {
        console.log("check value piority : ", value);
        dispatch(filtersSlice.actions.prioritiesFilterChange(value))
    }

    return (
        <Row justify='center'>
            <Col span={24}>
                <Typography.Paragraph
                    style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
                >
                    Search
                </Typography.Paragraph>
                <Search value={filters.search} placeholder='input search text' onChange={handleSearchTextChange} />
            </Col>
            {/* <Col sm={24}>
                <Typography.Paragraph
                    style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
                >
                    Filter By Status
                </Typography.Paragraph>
                <Radio.Group value={filters.status} onChange={handleStatusChange}>
                    <Radio value='All'>All</Radio>
                    <Radio value='Completed'>Completed</Radio>
                    <Radio value='Todo'>To do</Radio>
                </Radio.Group>
            </Col> */}
            <Col sm={24}>
                <Typography.Paragraph
                    style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
                >
                    Filter By Priority
                </Typography.Paragraph>
                <Select
                    mode='multiple'
                    allowClear
                    placeholder='Please select'
                    style={{ width: '100%' }}
                    value={filters.piority}
                    onChange={handlePriorityChange}
                >

                    <Select.Option value='high' >
                        <Tag color='red'>high</Tag>
                    </Select.Option>
                    <Select.Option value='medium'>
                        <Tag color='blue'>medium</Tag>
                    </Select.Option>
                    <Select.Option value='low' >
                        <Tag color='gray'>low</Tag>
                    </Select.Option>
                </Select>
            </Col>
        </Row>
    );
}