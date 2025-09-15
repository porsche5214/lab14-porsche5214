import {
  Modal,
  Stack,
  TextInput,
  Radio,
  Select,
  Checkbox,
  Alert,
  Button,
  PasswordInput,
  Text,
  Divider,
  Group,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMarathonFormStore } from "../store/MarathonFormStore";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { marathonSchema } from "../zod/MarathonSchema";
import { useEffect, useState } from "react";
import { type MarathonModalProps } from "../libs/Marathon";
export default function MarathonModal({ opened, onClose }: MarathonModalProps) {
  const [agree, setAgree] = useState(false);
  const {
    fname,
    lname,
    plan,
    gender,
    email,
    couponCode,
    haveCoupon,
    total,
    setFname,
    setLname,
    setPlan,
    setGender,
    setEmail,
    setCouponCode,
    setHaveCoupon,
    discountCupon,
    reset,
  } = useMarathonFormStore();

  // Mantine Form
  const marathonForm = useForm({
    initialValues: {
      fname,
      lname,
      plan,
      gender,
      agree,
      email,
      password: "",
      confirmPassword: "",
      haveCoupon,
      couponCode,
    },
    validate: zod4Resolver(marathonSchema),
    validateInputOnChange: true,
  });
  // update Zustand form real-time
  useEffect(() => {
    discountCupon();
  }, [marathonForm.values]);

  const onSubmitRegister = () => {
    //  alert หลังจาก กด Register
    alert("See you at CMU Marathon");
    onClose();
    reset();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Register CMU Marathon 🏃‍♂️"
      centered
      size="xl"
    >
      <form onSubmit={marathonForm.onSubmit(onSubmitRegister)}>
        <Stack>
          <Group justify="space-between" gap="xs" grow>
            <TextInput
              label="First name"
              withAsterisk
              value={fname}
              onChange={(e) => {
                setFname(e.currentTarget.value);
                marathonForm.setFieldValue("fname", e.currentTarget.value);
              }}
              error={marathonForm.errors.fname}
            />
            <TextInput
              label="Last name"
              withAsterisk
              value={lname}
              onChange={(e) => {
                setLname(e.currentTarget.value);
                marathonForm.setFieldValue("lname", e.currentTarget.value);
              }}
              error={marathonForm.errors.lname}
            />
          </Group>
          <TextInput
            label="Email"
            withAsterisk
            description="ex.excemble@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.currentTarget.value);
              marathonForm.setFieldValue("email", e.currentTarget.value);
            }}
            error={marathonForm.errors.email}
          />
          {/* PasswordInput */}
          <PasswordInput
            label="Password"
            description="Password must contain 6-12 charaters"
            withAsterisk
            value={marathonForm.values.password}
            onChange={(e) =>
              marathonForm.setFieldValue("password", e.currentTarget.value)
            }
            error={marathonForm.errors.password}
          />
          <PasswordInput
            label="Confirm Password"
            description="Confirm Password"
            withAsterisk
            value={marathonForm.values.confirmPassword}
            onChange={(e) =>
              marathonForm.setFieldValue(
                "confirmPassword",
                e.currentTarget.value
              )
            }
            error={marathonForm.errors.confirmPassword}
          />
          <Select
            label="Plan"
            placeholder="Please select.."
            data={[
              { value: "funrun", label: "Fun run 5.5 Km (500 THB)" },
              { value: "mini", label: "Mini Marathon 10 Km (800 THB)" },
              { value: "half", label: "Half Marathon 21 Km (1,200 THB)" },
              { value: "full", label: "Full Marathon 42.195 Km (1,500 THB)" },
            ]}
            value={plan}
            onChange={(value) => {
              if (value !== null) {
                const v = value as "funrun" | "mini" | "half" | "full";
                setPlan(value as "funrun" | "mini" | "half" | "full");
                marathonForm.setFieldValue("plan", v);
              }
            }}
            error={marathonForm.errors.plan}
          />

          <Radio.Group
            label="Gender"
            value={gender}
            onChange={(value) => {
              if (value !== null) {
                const v = value as "male" | "female";
                setGender(v);
                marathonForm.setFieldValue("gender", v);
              }
            }}
            error={marathonForm.errors.gender}
          >
            <Radio m={4} value="male" label="Male 👨" />
            <Radio m={4} value="female" label="Female 👩" />
          </Radio.Group>

          <Alert color="blue" title="Promotion 📢">
            Coupon (30% Discount)
          </Alert>
          {/* เลือกกรออก coupon ตรงนี้ */}
          <Checkbox
            label="I have coupon"
            checked={marathonForm.values.haveCoupon}
            onChange={(e) => {
              setHaveCoupon(e.currentTarget.checked);
              marathonForm.setFieldValue("haveCoupon", e.currentTarget.checked);
            }}
          />
          {/* จะต้องแสดงเมื่อกด เลือก I have coupon เท่านั้น*/}
          {marathonForm.values.haveCoupon && (
            <TextInput
              label="Coupon Code"
              value={couponCode}
              onChange={(e) => {
                setCouponCode(e.currentTarget.value);
                marathonForm.setFieldValue("couponCode", e.currentTarget.value);
              }}
              error={marathonForm.errors.couponCode}
            />
          )}
          {/* แสดงราคาการสมัครงานวิ่งตามแผนที่เลือก  */}
          <Text>Total Payment : {total} THB</Text>
          <Divider my="xs" variant="dashed" />
          <Checkbox
            label={
              <>
                I accept
                <Text mx={2} span c="red" inherit>
                  terms and conditions
                </Text>
              </>
            }
            checked={agree}
            onChange={(e) => {
              setAgree(e.currentTarget.checked);
              marathonForm.setFieldValue("agree", e.currentTarget.checked);
            }}
            error={marathonForm.errors.agree}
          />
          <Button type="submit" disabled={!marathonForm.values.agree}>
            Register
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
