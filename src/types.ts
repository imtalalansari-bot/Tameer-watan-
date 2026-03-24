export type UserRole = 'admin' | 'teacher' | 'student';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  photoURL?: string;
  createdAt: string;
}

export interface Admission {
  id?: string;
  fullName: string;
  fatherName: string;
  cnic: string;
  phone: string;
  email: string;
  address: string;
  classApplyingFor: string;
  previousSchool: string;
  marks: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface Announcement {
  id?: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

export interface Attendance {
  id?: string;
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  teacherId: string;
}

export interface Result {
  id?: string;
  studentId: string;
  subject: string;
  marks: number;
  grade: string;
  teacherId: string;
  createdAt: string;
}
