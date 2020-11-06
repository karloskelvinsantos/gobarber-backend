import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('appointments')
class Appointment {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "varchar", nullable: false})
    provider: string

    @Column({ type: "timestamptz"})
    date: Date
}

export default Appointment;