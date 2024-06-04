/**
 * @deprecated soon to be removed
 */
import { ReactTags, Tag } from 'react-tag-autocomplete'
import { useState, useCallback } from "react";

interface MultipleSelectProps {
	options: string[],
	label?:string
	onChange: (value: any[]) => void,
    suggestions: string[],
    onAdd: () => void,
    onDelete: () => void,
}



const MultipleSelect = (props: MultipleSelectProps) => {
	const [selected, setSelected] = useState<Tag[]>([])

	const onAdd = useCallback(
		(newTag: Tag) => {
			props.onAdd
		},
		[selected]
		)

		const onDelete = useCallback(
			(tagIndex: Number ) => {
				setSelected(selected.filter((_, i) => i !== tagIndex))
			},
			[selected]
		)
	return (
		<div>
			<ReactTags labelText={props.label} selected={selected} onAdd={onAdd} onDelete={onDelete} suggestions={props.suggestions.map((v) => {return {label:v, value:v}})}  noOptionsText="Your hobby must really be uncommon"/>
		</div>
	);
};

export default MultipleSelect;
