import React, { Fragment, useMemo } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import {
	Calendar,
	Views,
	DateLocalizer,
	momentLocalizer,
} from "react-big-calendar";

const mLocalizer = momentLocalizer(moment);

const ColoredDateCellWrapper = ({ children }) =>
	React.cloneElement(React.Children.only(children), {
		style: {
			backgroundColor: "lightblue",
		},
	});

/**
 * We are defaulting the localizer here because we are using this same
 * example on the main 'About' page in Storybook
 */
const CalendarView = ({ localizer = mLocalizer, ...props }) => {
	const { tasks } = useSelector((state) => state);

	const { components, defaultDate, views } = useMemo(
		() => ({
			components: {
				timeSlotWrapper: ColoredDateCellWrapper,
			},
			defaultDate: new Date(),
			views: Object.keys(Views).map((k) => Views[k]),
		}),
		[]
	);

	return (
		<Fragment>
			<div className='height600' {...props} style={{ width: "100%" }}>
				<Calendar
					components={components}
					defaultDate={defaultDate}
					events={tasks}
					localizer={localizer}
					showMultiDayTimes
					step={60}
					views={views}
				/>
			</div>
		</Fragment>
	);
};
CalendarView.propTypes = {
	localizer: PropTypes.instanceOf(DateLocalizer),
};

export default CalendarView;
