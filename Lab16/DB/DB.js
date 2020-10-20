const mssql = require('mssql/msnodesqlv8');
const config = require('./DBConfig');

function DB (cb) {
    this.getFaculties = (args, context) => {
        return (new mssql.Request())
            .query('select * from FACULTY')
            .then((r) => { return r.recordset });
    };

    this.getPulpits = (args, context) => {
        return (new mssql.Request())
            .query('select * from PULPIT')
            .then((r) => { return r.recordset; });
    };

    this.getSubjects = (args, context) => {
        return (new mssql.Request())
            .query('select * from SUBJECT')
            .then((r) => { return r.recordset; });
    };

    this.getTeachers = (args, context) => {
        return (new mssql.Request())
            .query('select * from TEACHER')
            .then((r) => { return r.recordset; });
    };

    this.getFaculty = (args, context) => {
        return (new mssql.Request())
            .input('f', mssql.NVarChar, args.FACULTY)
            .query('select top(1) * from FACULTY where FACULTY = @f')
            .then((r) => { return r.recordset; });
    };

    this.getPulpit = (args, context) => {
        return (new mssql.Request())
            .input('p', mssql.NVarChar, args.PULPIT)
            .query('select top(1) * from PULPIT where PULPIT = @p')
            .then((r) => { return r.recordset; });
    };

    this.getSubject = (args, context) => {
        return (new mssql.Request())
            .input('s', mssql.NVarChar, args.SUBJECT)
            .query('select top(1) * from SUBJECT where SUBJECT = @s')
            .then((r) => { return r.recordset; });
    };

    this.getTeacher = (args, context) => {
        return (new mssql.Request())
            .input('t', mssql.NVarChar, args.TEACHER)
            .query('select top(1) * from TEACHER where TEACHER = @t')
            .then((r) => { return r.recordset; });
    };

    this.delFaculty = (args, context) => {
        return (new mssql.Request())
            .input('f', mssql.NVarChar, args.FACULTY)
            .query('delete from FACULTY where FACULTY = @f')
            .then((r) => {
                return r.rowsAffected[0] !== 0;
            });
    };

    this.delPulpit = (args, context) => {
        return (new mssql.Request())
            .input('p', mssql.NVarChar, args.PULPIT)
            .query('delete from PULPIT where PULPIT = @p')
            .then((r) => {
                return r.rowsAffected[0] !== 0;
            });
    };

    this.delSubject = (args, context) => {
        return (new mssql.Request())
            .input('s', mssql.NVarChar, args.SUBJECT)
            .query('delete from SUBJECT where SUBJECT = @s')
            .then((r) => {
                return (r.rowsAffected[0] === 0) ? null : args;
            });
    };

    this.delTeacher = (args, context) => {
        return (new mssql.Request())
            .input('t', mssql.NVarChar, args.TEACHER)
            .query('delete from TEACHER where TEACHER = @t')
            .then((r) => {
                return r.rowsAffected[0] !== 0;
            });
    };

    this.insertFaculty = (args, context) => {
        return (new mssql.Request())
            .input('a', mssql.NVarChar, args.FACULTY)
            .input('b', mssql.NVarChar, args.FACULTY_NAME)
            .query('insert FACULTY(FACULTY, FACULTY_NAME) values (@a, @b)')
            .then((r) => {return args});
    };

    this.insertPulpit = (args, context) => {
        return (new mssql.Request())
            .input('a', mssql.NVarChar, args.PULPIT)
            .input('b', mssql.NVarChar, args.PULPIT_NAME)
            .input('c', mssql.NVarChar, args.FACULTY)
            .query('insert PULPIT(PULPIT, PULPIT_NAME, FACULTY) values (@a, @b, @c)')
            .then((r) => { return args });
    };

    this.insertSubject = (args, context) => {
        return (new mssql.Request())
            .input('a', mssql.NVarChar, args.SUBJECT)
            .input('b', mssql.NVarChar, args.SUBJECT_NAME)
            .input('c', mssql.NVarChar, args.PULPIT)
            .query('insert SUBJECT(SUBJECT, SUBJECT_NAME, PULPIT) values (@a, @b, @c)')
            .then((r) => { return args });
    };

    this.insertTeacher = (args, context) => {
        return (new mssql.Request())
            .input('a', mssql.NVarChar, args.TEACHER)
            .input('b', mssql.NVarChar, args.TEACHER_NAME)
            .input('c', mssql.NVarChar, args.PULPIT)
            .query('insert teacher(TEACHER, TEACHER_NAME, PULPIT) values (@a, @b, @c)')
            .then((r) => { return args });
    };

    this.updateFaculty = (args, context) => {
        return (new mssql.Request())
            .input('a', mssql.NVarChar, args.FACULTY)
            .input('b', mssql.NVarChar, args.FACULTY_NAME)
            .query('update FACULTY set FACULTY = @a, FACULTY_NAME = @b where FACULTY = @a')
            .then((r) => {
                return (r.rowsAffected[0] === 0) ? null : args;
            });
    };

    this.updatePulpit = (args, context) => {
        return (new mssql.Request())
            .input('a', mssql.NVarChar, args.PULPIT)
            .input('b', mssql.NVarChar, args.PULPIT_NAME)
            .input('c', mssql.NVarChar, args.FACULTY)
            .query('update PULPIT set PULPIT = @a, PULPIT_NAME = @b, FACULTY = @c where PULPIT = @a')
            .then((r) => {
                return (r.rowsAffected[0] === 0) ? null : args;
            });
    };

    this.updateSubject = (args, context) => {
        return (new mssql.Request())
            .input('a', mssql.NVarChar, args.SUBJECT)
            .input('b', mssql.NVarChar, args.SUBJECT_NAME)
            .input('c', mssql.NVarChar, args.PULPIT)
            .query('update SUBJECT set SUBJECT = @a, SUBJECT_NAME = @b, PULPIT = @c where SUBJECT = @a')
            .then((r) => {
                return(r.rowsAffected[0] === 0) ? null : args;
            });
    };

    this.updateTeacher = (args, context) => {
        return (new mssql.Request())
            .input('a', mssql.NVarChar, args.TEACHER)
            .input('b', mssql.NVarChar, args.TEACHER_NAME)
            .input('c', mssql.NVarChar, args.PULPIT)
            .query('update TEACHER set TEACHER = @a, TEACHER_NAME = @b, PULPIT = @c where TEACHER = @a')
            .then((r) => {
                return (r.rowsAffected[0] === 0) ? null : args;
            });
    };

    this.getTeachersByFaculty = (args, context) => {
        return (new mssql.Request())
            .input('f', mssql.NVarChar, args.FACULTY)
            .query('select TEACHER.*, PULPIT.FACULTY from TEACHER ' +
                'inner join PULPIT on TEACHER.PULPIT = PULPIT.PULPIT ' +
                'inner join FACULTY on PULPIT.FACULTY = FACULTY.FACULTY where FACULTY.FACULTY = @f')
            .then((r) => {
                let zaps = (o) => {
                    return {TEACHER: o.TEACHER, TEACHER_NAME: o.TEACHER_NAME, PULPIT: o.PULPIT}
                };
                let zapp = (o) => {
                    return {FACULTY: o.FACULTY, TEACHERS: [zaps(o)]}
                };
                let rc = [];
                r.recordset.forEach((el, index) => {
                    if (index === 0)
                        rc.push(zapp(el));
                    else if (rc[rc.length - 1].FACULTY !== el.FACULTY)
                        rc.push(zapp(el));
                    else
                        rc[rc.length - 1].TEACHERS.push(zaps(el));
                });
                console.log(rc)
                return rc;
            })
    };

    this.getSubjectsByFaculties = (args, context) => {
        return (new mssql.Request())
            .input('f', mssql.NVarChar, args.FACULTY)
            .query('select SUBJECT.*, PULPIT.PULPIT_NAME, PULPIT.FACULTY from SUBJECT ' +
                'inner join PULPIT on subject.PULPIT = PULPIT.PULPIT ' +
                'inner join FACULTY on PULPIT.FACULTY = FACULTY.FACULTY where FACULTY.FACULTY = @f')
            .then((r) => {
                let zaps = (o) => {return {SUBJECT: o.SUBJECT, SUBJECT_NAME: o.SUBJECT_NAME, PULPIT: o.PULPIT}};
                let zapp = (o) => {return {PULPIT: o.PULPIT, PULPIT_NAME: o.PULPIT_NAME, FACULTY: o.FACULTY, SUBJECTS:[zaps(o)]}};
                let rc = [];
                r.recordset.forEach((el, index) => {
                    if (index === 0)
                        rc.push(zapp(el));
                    else if (rc[rc.length - 1].PULPIT !== el.PULPIT)
                        rc.push(zapp(el));
                    else
                        rc[rc.length - 1].SUBJECTS.push(zaps(el));
                });
                console.log(rc)
                return rc;
            });
    };

    this.connect = mssql.connect(config, err => {
        err ? cb(err, null) : cb(null, this.connect);
    });
}

exports.DB = (cb) => { return new DB(cb) };
