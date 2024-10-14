import { Box, MenuItem, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { jobTypeLoadAction } from '../../redux/actions/jobtypeactions';
import { editSingleJobAction, jobLoadSingleAction } from '../../redux/actions/jobactions';
import { useNavigate, useParams } from 'react-router-dom';
import { EDIT_JOB_RESET } from '../../redux/constants/jobconstants';



const validationSchema = yup.object({
    Title: yup
        .string('Enter a job title')
        .required('title is required'),
    description: yup
        .string('Enter a description')
        .min(6, 'Description should be of minimum 6 characters length')
        .required('Description is required'),
    Salary: yup
        .number('Enter a salary')
        .required('Salary is required'),
    location: yup
        .string('Enter a location')
        .required('Location is required'),
    available: yup
        .boolean('Add availability')
        .required('availability is required'),
    Jobtype: yup
        .string('Enter a Category')
        .required('Category is required'),
});


const DashEditJob = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    //job type
    useEffect(() => {
        dispatch(jobTypeLoadAction());
        if (id) {
            dispatch(jobLoadSingleAction(id));
        }
    }, [id]);


    const { Jobtype } = useSelector(state => state.jobTypeAll) || "not define";
    const { singleJob, loading } = useSelector(state => state.singleJob) || "not define";
    const { success } = useSelector(state => state.updateJob);

    const formik = useFormik({
        initialValues: {
            _id: singleJob?._id,
            title: singleJob?.Title,
            description: singleJob?.description,
            salary: singleJob?.Salary,
            location: singleJob?.location,
            available: singleJob?.available,
            Jobtype: singleJob?.Jobtype?._id,
        },
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: (values, actions) => {
            dispatch(editSingleJobAction(values))
            // alert(JSON.stringify(values, null, 2));
            actions.resetForm();
        },
    });


    //redirect after successfull update
    useEffect(() => {
        if (success && success === true) {
            setTimeout(() => {
                dispatch({ type: EDIT_JOB_RESET })
                navigate('/admin/jobs');
            }, 800)
        }
    }, [success && success]);



    return (
        <>

            <Box sx={{ height: '100%', display: "flex", alignItems: "center", justifyContent: "center", pt: 4 }}>


                <Box onSubmit={formik.handleSubmit} component="form" className='form_style border-style' >
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                        <Typography variant="h5" component="h2" sx={{ pb: 3 }}>
                            Edit Job
                        </Typography>
                        <TextField sx={{ mb: 3 }}
                            fullWidth
                            id="Title"
                            label="Title"
                            name='title'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Title"
                            value={formik.values.Title}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.Title && Boolean(formik.errors.Title)}
                            helperText={formik.touched.Title && formik.errors.Title}
                        />
                        <TextField sx={{ mb: 3 }}
                            fullWidth
                            id="description"
                            name="description"
                            label="Description"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        />
                        <TextField sx={{ mb: 3 }}
                            fullWidth
                            id="Salary"
                            name="salary"
                            label="Salary"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Salary"
                            value={formik.values.Salary}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.Salary && Boolean(formik.errors.Salary)}
                            helperText={formik.touched.Salary && formik.errors.Salary}
                        />
                        <TextField sx={{ mb: 3 }}
                            fullWidth
                            id="location"
                            name="location"
                            label="Location"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Location"
                            value={formik.values.location}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.location && Boolean(formik.errors.location)}
                            helperText={formik.touched.location && formik.errors.location}
                        />

                        <TextField sx={{ mb: 3 }}
                            fullWidth
                            id="available"
                            name="available"
                            label="Available"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Location"
                            value={formik.values.available}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.available && Boolean(formik.errors.available)}
                            helperText={formik.touched.available && formik.errors.available}
                        />

                        <TextField sx={{ mb: 3 }}
                            fullWidth
                            className="px-2 my-2"
                            variant="outlined"
                            name="jobType"
                            id="Jobtype"
                            select
                            label="Category"
                            value={formik.values.Jobtype}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.Jobtype && Boolean(formik.errors.Jobtype)}
                            helperText={formik.touched.Jobtype && formik.errors.Jobtype}
                        >
                            <MenuItem key={""} value={""}>

                            </MenuItem>

                            {Jobtype && Jobtype.map((cat) => (
                                <MenuItem key={cat._id} value={cat._id}>
                                    {cat.JobTypeName}
                                </MenuItem>
                            ))}
                        </TextField>

                        <Button fullWidth variant="contained" type='submit' >Edit job</Button>
                    </Box>
                </Box>
            </Box>

        </>
    )
}

export default DashEditJob