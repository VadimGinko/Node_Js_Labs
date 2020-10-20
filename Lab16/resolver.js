const resolver = {
    getFaculties: (args, context) => {
        return  (args.FACULTY) ? context.getFaculty(args, context) : context.getFaculties(args, context);
    },

    getPulpits: (args, context) => {
        return  (args.PULPIT) ?context.getPulpit(args, context) : context.getPulpits(args, context);
    },

    getSubjects: (args, context) => {
        return  (args.SUBJECT) ? context.getSubject(args, context) : context.getSubjects(args, context);
    },

    getTeachers: (args, context) => {
        return  (args.TEACHER) ? context.getTeacher(args, context) : context.getTeachers(args, context);
    },

    setFaculty: async (args, context) => {
        let res = await context.updateFaculty(args, context);
        return (res == null) ? context.insertFaculty(args, context) : res;
    },

    setPulpit: async (args, context) => {
        let res = await context.updatePulpit(args, context);
        return  (res == null) ? context.insertPulpit(args, context) : res;
    },

    setSubject: async (args, context) => {
        let res = await context.updateSubject(args, context);
        return  (res == null) ? context.insertSubject(args, context) : res;
    },

    setTeacher: async (args, context) => {
        let res = await context.updateTeacher(args, context);
        return (res == null) ? context.insertTeacher(args, context) : res;
    },

    delFaculty: (args, context) => context.delFaculty(args, context),
    delPulpit: (args, context) => context.delPulpit(args, context),
    delSubject: (args, context) => context.delSubject(args, context),
    delTeacher: (args, context) => context.delTeacher(args, context),
    getTeachersByFaculty: (args, context) => context.getTeachersByFaculty(args, context),
    getSubjectsByFaculties: (args, context) => context.getSubjectsByFaculties(args, context)
};

module.exports = resolver;
