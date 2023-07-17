const express = require('express')
const router = express.Router()
const Student = require('../models/students')

//create student 
router.post("/students", async (req, res) => {
    try {
        const student = new Student(req.body)

        const createStudent = await student.save()
        res.status(201).send(createStudent)
    } catch (e) {
        res.status(400).send(e)
    }
})

//get all students
router.get("/students", async (req, res) => {
    try {
        const studentsData = await Student.find()
        res.status(200).send(studentsData)
    } catch (e) {
        res.status(400).send(e)
    }
})

//get single student
router.get("/students/:id", async (req, res) => {
    try {
        const _id = req.params.id
        const studentData = await Student.findById(_id)
        if (!studentData) {
            res.status(404).send("No Student found for the given ID")
        } else {
            res.status(200).send(studentData)
        }
    } catch (e) {
        res.status(500).send(e)
    }
})

//update student data
router.patch("/students/:id", async (req, res) => {
    try {
        const _id = req.params.id
        const updateStudent = await Student.findByIdAndUpdate(_id, req.body, { new: true })
        res.status(201).send({updateStudent:updateStudent, msg:"Student data updated successfully...!"})
    } catch (e) {
        res.status(404).send({msg:"No Student found with this ID"})
    }
})

//Delete student
router.delete("/students/:id", async (req, res)=>{
    try{
        const deleteStudent = await Student.findByIdAndDelete(req.params.id)
            res.send({deletedStudent:deleteStudent,msg:"Student deleted successfully...!"})
    }catch(e){
        res.status(404).send({msg:"No student found with this ID"})
    }
})

module.exports = router