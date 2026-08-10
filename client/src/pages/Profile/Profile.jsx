import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getProfile, updateProfile } from "../../api/userApi";

import Button from "../../components/ui/Button";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";

import "./Profile.css";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadProfile = async () => {
    try {
      const res = await getProfile();

      const user = res.data?.data ?? res.data ?? null;

      setProfile(user);
      setName(user?.name || "");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to load profile",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleSave = async () => {
    if (!name.trim()) {
      toast.warning("Name cannot be empty");
      return;
    }

    try {
      setSaving(true);

      const res = await updateProfile({
        name: name.trim(),
      });

      const updatedProfile =
        res.data?.data ?? res.data ?? null;

      setProfile(updatedProfile);
      setName(updatedProfile?.name || name.trim());
      setIsEditing(false);

      toast.success("Profile updated successfully");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to update profile",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setName(profile?.name || "");
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="page">
        <PageHeader
          title="My Profile"
          subtitle="View and manage your personal information."
        />

        <Card>
          <div className="profile-loading">
            Loading profile...
          </div>
        </Card>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="page">
        <PageHeader
          title="My Profile"
          subtitle="View and manage your personal information."
        />

        <Card>
          <div className="profile-empty">
            Unable to load profile information.
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="page">
      <PageHeader
        title="My Profile"
        subtitle="View and manage your personal information."
      />

      <Card>
        <div className="profile-header">
          <div className="profile-avatar">
            {profile.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div>
            <h2>{profile.name}</h2>
            <p>
              {profile.role
                ? profile.role.charAt(0).toUpperCase() +
                  profile.role.slice(1)
                : "User"}
            </p>
          </div>
        </div>

        <div className="profile-divider" />

        <div className="profile-grid">
          <div className="profile-field">
            <label>Name</label>

            {isEditing ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            ) : (
              <p>{profile.name || "-"}</p>
            )}
          </div>

          <div className="profile-field">
            <label>Email</label>
            <p>{profile.email || "-"}</p>
          </div>

          <div className="profile-field">
            <label>Role</label>
            <p>
              {profile.role
                ? profile.role.charAt(0).toUpperCase() +
                  profile.role.slice(1)
                : "-"}
            </p>
          </div>

          <div className="profile-field">
            <label>Department</label>
            <p>{profile.department?.name || "-"}</p>
          </div>

          <div className="profile-field">
            <label>Designation</label>
            <p>{profile.designation?.name || "-"}</p>
          </div>
        </div>

        <div className="profile-note">
          <strong>Note:</strong> Department, designation, role, and
          email are managed by the organization and cannot be
          changed from your profile.
        </div>

        <div className="profile-actions">
          {isEditing ? (
            <>
              <Button
                variant="secondary"
                onClick={handleCancel}
                disabled={saving}
              >
                Cancel
              </Button>

              <Button onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Profile;